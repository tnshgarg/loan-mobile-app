import { api } from "./api";
import { getVersion } from "react-native-device-info";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMobile: builder.mutation({
      query: (phoneNumber) => ({
        url: `mobile`,
        method: "POST",
        body: { number: phoneNumber },
      }),
    }),
    generateOtp: builder.mutation({
      query: (phoneNumber) => ({
        url: `login/generate-otp`,
        method: "POST",
        body: { mobileNumber: phoneNumber },
      }),
      transformResponse: (response) => response.response,
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `login/verify-otp`,
        method: "POST",
        headers: { "X-Unipe-App-Version": getVersion() },
        body: body,
      }),
    }),
    overrideExisting: true,
  }),
});

export const {
  useGetMobileMutation,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
} = loginApi;
