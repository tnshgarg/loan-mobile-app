import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  EMPLOYEE_API_URL,
  KYC_AADHAAR_GENERATE_OTP_API_URL,
} from "../services/constants";
import { OG_API_KEY } from "@env";

export const PostAadhaarOtp = () => {
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

export const fetchAadhaarData = ({ data }) => {
  const response = useQuery(
    ["aadhaar-data-otp"],
    async () => {
      var url = KYC_AADHAAR_GENERATE_OTP_API_URL;
      return await axios({
        method: "post",
        url: `${url}`,
        headers: {
          "X-Auth-Type": "API-Key",
          "X-API-Key": OG_API_KEY,
          "Content-Type": "application/json",
        },
        data: data,
      }).then((response) => {
        // console.log("aadhaarotpdata response: ", response);
        return response;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      refetchInterval: 1000 * 60 * 60 * 24, // 1 day
    }
  );
  return response;
};
