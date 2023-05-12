import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  KYC_AADHAAR_GENERATE_OTP_API_URL,
  KYC_AADHAAR_SUBMIT_OTP_API_URL,
  EMPLOYEE_API_URL,
} from "../../services/constants";
import { OG_API_KEY } from "../../services/constants";
import { getBackendData } from "../../services/employees/employeeServices";

export const getAadhaar = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getAadhaar"],
    queryFn: async () => {
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "aadhaar",
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

export const generateAadhaarOTP = () => {
  const mutation = useMutation({
    mutationFn: async ({ data }) => {
      return axios({
        method: "post",
        url: KYC_AADHAAR_GENERATE_OTP_API_URL,
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

export const submitAadhaarOTP = () => {
  const mutation = useMutation({
    mutationFn: async ({ data }) => {
      return axios({
        method: "post",
        url: KYC_AADHAAR_SUBMIT_OTP_API_URL,
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
