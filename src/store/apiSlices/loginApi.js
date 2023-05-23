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
        console.log({ response });
        if (response.response) {
          return response.response;
        }
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `login/verify-otp`,
        method: "POST",
        headers: { "X-Unipe-App-Version": getVersion() },
        body: body,
      }),
      transformResponse: (response) => {
        console.log({ response });

        return response;
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),

    overrideExisting: true,
  }),
});

export const { useGenerateOtpMutation, useVerifyOtpMutation } = loginApi;
