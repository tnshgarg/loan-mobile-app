import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EMPLOYEE_API_URL, RZP_AUTH } from "../services/constants";

export const queryClient = new QueryClient();

export const fetchQuery = ({ unipeEmployeeId, token }) => {
  const response = useQuery(
    ["repayments"],
    async () => {
      var url = `${EMPLOYEE_API_URL}/ewa/repayment`;
      return await axios({
        method: "GET",
        url: `${url}?unipeEmployeeId=${unipeEmployeeId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log("repayments response: ", response);
        return response;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      onSettled: () => {},
      staleTime: 1000 * 50, // 50 Seconds
      refetchInterval: 1000 * 60, // 1 Minute
    }
  );
  return response;
};

export const PostQuery = ({ amount, repaymentId }) => {
  const response = useQuery(
    ["repayments-post"],
    async () => {
      return await axios({
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
      })
        .then((response) => {
          console.log("repayments post response:", response);
          return response;
        })
        .catch(console.error);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSettled: () => {},
      staleTime: 1000 * 60, // 60 Seconds
      enabled: false,
      refetchIntervalInBackground: false,
    }
  );
  return response;
};

export const PostRepayment = () => {
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
          console.log("repayments mutation post response:", response);
          return response;
        })
        .catch(console.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repayments"] });
    },
  });
  return mutation;
};
