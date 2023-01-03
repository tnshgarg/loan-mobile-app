import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EMPLOYEE_API_URL, RZP_AUTH } from "../services/constants";
import { queryClient } from "./index";

export const PostOffer = () => {
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
          console.log("EWA offer response:", response);
          return response;
        })
        .catch(console.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ewa-offer"] });
    },
  });
  return mutation;
};

export const fetchKycData = ({ unipeEmployeeId, token }) => {
  const response = useQuery(
    ["ewa-kyc"],
    async () => {
      var url = `${EMPLOYEE_API_URL}/risk-profile`;
      return await axios({
        method: "GET",
        url: `${url}?unipeEmployeeId=${unipeEmployeeId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log("ewa response: ", response);
        return response;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      onSettled: () => {},
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      refetchInterval: 1000 * 60 * 60 * 24, // 1 day
    }
  );
  return response;
};

export const PostKycData = () => {
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
          console.log("ewakyc response:", response);
          return response;
        })
        .catch(console.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ewa-kyc-post"] });
    },
  });
  return mutation;
};

export const PostAgreementData = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, xpath, token }) => {
      return axios({
        method: "post",
        url: `${EMPLOYEE_API_URL}/ewa/agreement`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      })
        .then((response) => {
          console.log("ewakyc response:", response);
          return response;
        })
        .catch(console.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ewa-agreement-post"] });
    },
  });
  return mutation;
};

export const fetchDisbursement = ({ token, params }) => {
  const response = useQuery(
    ["ewa-disbursement"],
    async () => {
      var url = `${EMPLOYEE_API_URL}/ewa/disbursement`;
      return await axios({
        method: "GET",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: params,
      }).then((response) => {
        console.log("ewa response: ", response);
        return response;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      onSettled: () => {},
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      refetchInterval: 1000 * 60 * 60 * 24, // 1 day
    }
  );
  return response;
};
