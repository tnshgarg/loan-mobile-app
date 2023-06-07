import { api } from "./api";
import { getVersion } from "react-native-device-info";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateOtp: builder.mutation({
      query: (phoneNumber) => ({
        url: `login/generate-otp`,
        method: "POST",
        body: { mobileNumber: phoneNumber },
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response.data.error;
      }
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `login/verify-otp`,
        method: "POST",
        headers: { "X-Unipe-App-Version": getVersion() },
        body: body,
      }),
      transformResponse: (response) => {
        console.tron.log("response", response);
        return response;
      },
      transformErrorResponse: (error) => {
        console.tron.log("ErrorRes", error);
        if (error?.data) {
          return error.data;
        }
      }
    }),
  }),
  overrideExisting: true,
});

export const { useGenerateOtpMutation, useVerifyOtpMutation } = loginApi;
