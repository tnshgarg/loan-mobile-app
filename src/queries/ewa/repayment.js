import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../client";
import { RZP_AUTH } from "../../services/constants";
import {
  getBackendData,
  putBackendData,
} from "../../services/employees/employeeServices";

export const getRepayment = async ({queryKey}) => {
  const [_, unipeEmployeeId, token] = queryKey;
  return await getBackendData({
                params: { unipeEmployeeId: unipeEmployeeId },
                xpath: "ewa/repayment",
                token: token,
              });
}

export const updateRepayment = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return putBackendData({
        data: data,
        xpath: "ewa/repayment",
        token: token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRepayment"] });
      queryClient.invalidateQueries({ queryKey: ["getEwaOffers"] });
    },
  });
  return mutation;
};

export const createRazorpayOrder = ({ amount, repaymentId }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return axios({
        method: "post",
        url: "https://api.razorpay.com/v1/orders",
        headers: {
          "Content-Type": "application/json",
          Authorization: RZP_AUTH,
        },
        data: JSON.stringify({
          amount: amount * 100,
          currency: "INR",
          notes: {
            repaymentId: repaymentId,
          },
        }),
      });
    },
  });
  return mutation;
};
