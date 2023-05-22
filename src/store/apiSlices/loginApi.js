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
        if (response.response) {
          return response.response;
        } else {
          throw Error(response.message);
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
        if (response.response.status === "success") {
          return response.response;
        } else {
          throw Error(response.response.details);
        }
      },
    }),
    overrideExisting: true,
  }),
});

export const { useGenerateOtpMutation, useVerifyOtpMutation } = loginApi;
