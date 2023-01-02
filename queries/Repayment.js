import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EMPLOYEE_API_URL, RZP_AUTH } from "../services/constants";

export const queryClient = new QueryClient();

export const getRepayment = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getRepayment"],
    queryFn: async () => {
      var url = `${EMPLOYEE_API_URL}/ewa/repayment`;
      return axios({
        method: "GET",
        url: `${url}?unipeEmployeeId=${unipeEmployeeId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    config: {
      staleTime: 1000 * 60 * 1,
      cacheTime: 1000 * 60 * 1,
      refetchInterval: 1000 * 60 * 1,
    },
  });
  return response;
};

export const updateRepayment = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, xpath, token }) => {
      return axios({
        method: "post",
        url: `${EMPLOYEE_API_URL}/${xpath}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      })
        .then((response) => {
          console.log("Repayments API POST response:", response);
          return response;
        })
        .catch(console.error);
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
