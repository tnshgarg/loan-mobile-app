import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../client";
import { RZP_AUTH } from "../../services/constants";
import {
  getBackendData,
  putBackendData,
} from "../../services/employees/employeeServices";

export const getRepayment = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getRepayment"],
    queryFn: async () => {
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/repayment",
        token: token,
      });
    },
    config: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 60 * 5,
    },
  });
  return response;
};

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
