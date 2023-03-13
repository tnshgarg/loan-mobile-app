import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { KYC_PAN_VERIFY_API_URL } from "../../services/constants";
import { OG_API_KEY } from "@env";
import { getBackendData } from "../../services/employees/employeeServices";

export const getPan = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getPan"],
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

export const verifyPan = () => {
  const mutation = useMutation({
    mutationFn: async ({ data }) => {
      return axios({
        method: "post",
        url: KYC_PAN_VERIFY_API_URL,
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
