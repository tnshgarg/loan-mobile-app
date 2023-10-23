import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KYC_SERVICE_URL } from "../../services/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: KYC_SERVICE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.kycServiceToken;
    console.log({ token });
    if (token) headers.set("Authorization", token);
    return headers;
  },
});

const createUploadMutation = (builder, url) =>
  builder.mutation({
    query: (bodyFormData) => {
      console.log({ bodyFormData });
      return {
        url,
        method: "POST",
        body: bodyFormData,
      };
    },
    transformErrorResponse: (err) => {
      console.log({ err });
      return {
        status: err.status,
        detail: err?.data?.detail,
      };
    },
  });

export const ewaOtpApi = createApi({
  reducerPath: "ewaOtpApi",
  baseQuery,
  endpoints: (builder) => ({
    generateEwaOtp: createUploadMutation(builder, "/otp-service/generate-otp/"),
    verifyEwaOtp: createUploadMutation(builder, "/otp-service/verify-otp/"),
  }),
});

export const {
  useGenerateEwaOtpMutation,
  useVerifyEwaOtpMutation,
} = ewaOtpApi;
