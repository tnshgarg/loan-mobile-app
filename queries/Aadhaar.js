import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  EMPLOYEE_API_URL,
  KYC_AADHAAR_GENERATE_OTP_API_URL,
} from "../services/constants";
import { OG_API_KEY } from "@env";

export const AadhaarBackendPush = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return axios({
        method: "post",
        url: `${EMPLOYEE_API_URL}/aadhaar`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      })
        .then((response) => {
          // console.log("Aadhaar otp response:", response);
          return response;
        })
        .catch(console.error);
    },
  });
  return mutation;
};

export const fetchAadhaarData = () => {
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
        .then((response) => {
          // console.log("Aadhaar otp response:", response);
          return response;
        })
        .catch(console.error);
    },
  });
  return mutation;
};
