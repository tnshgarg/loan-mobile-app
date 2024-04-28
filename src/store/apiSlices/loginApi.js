import { getVersion } from "react-native-device-info";
import { api } from "./api";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateOtp: builder.mutation({
      query: (phoneNumber) => ({
        url: `login/generate-otp`,
        method: "POST",
        body: { mobileNumber: phoneNumber },
      }),
      transformResponse: (response) => {
        console.log("Response: ", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log("Data.error: ", response);
        return response?.data?.error;
      },
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `login/verify-otp`,
        method: "POST",
        headers: { "X-Unipe-App-Version": getVersion() },
        body: body,
      }),
      invalidatesTags: ["getKycStatus"],
      transformResponse: (response) => {
        console.log("response", response);
        return response;
      },
      transformErrorResponse: (error) => {
        console.log("ErrorRes", error);
        if (error?.data) {
          return error.data;
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGenerateOtpMutation, useVerifyOtpMutation } = loginApi;
