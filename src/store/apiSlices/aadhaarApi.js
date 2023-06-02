import { api } from "./api";

export const aadhaarApi = api
  .enhanceEndpoints({ addTagTypes: ["getAadhaar"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAadhaar: builder.query({
        query: (unipeEmployeeId) => ({
          url: `aadhaar`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getAadhaar"],
        transformResponse: (response) => response.body,
      }),
      generateAadhaarOtp: builder.mutation({
        query: (body) => ({
          url: `kyc/aadhaar-generate-otp`,
          method: "POST",
          body: body,
        }),
        transformErrorResponse: (error) => {
          console.log({ error });
          return error?.data?.error;
        },
      }),
      verifyAadhaarOtp: builder.mutation({
        query: (body) => ({
          url: `kyc/aadhaar-submit-otp`,
          method: "POST",
          body: body,
        }),
      }),
      updateAadhaar: builder.mutation({
        query: (body) => ({
          url: `aadhaar`,
          method: "POST",
          body: body,
        }),
        transformResponse: (response) => response.response,
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetAadhaarQuery,
  useGenerateAadhaarOtpMutation,
  useVerifyAadhaarOtpMutation,
  useUpdateAadhaarMutation,
} = aadhaarApi;
