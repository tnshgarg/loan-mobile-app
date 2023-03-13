import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { KYC_BANK_VERIFY_API_URL } from "../../services/constants";
import { OG_API_KEY } from "@env";
import { getBackendData } from "../../services/employees/employeeServices";
import { bankBackendPush } from "../../helpers/BackendPush";

export const updateBank = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return bankBackendPush({
        data,
        token,
      });
    },
  });
  return mutation;
};

export const getBank = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getBank"],
    queryFn: async () => {
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "pan",
        token: token,
      });
    },
    config: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchInterval: 1000 * 60 * 60 * 24,
    },
  });
  return response;
};

export const verifyBank = () => {
  const mutation = useMutation({
    mutationFn: async ({ data }) => {
      return axios({
        method: "post",
        url: KYC_BANK_VERIFY_API_URL,
        headers: {
          "X-Auth-Type": "API-Key",
          "X-API-Key": OG_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      })
    },
  });
  return mutation;
};
