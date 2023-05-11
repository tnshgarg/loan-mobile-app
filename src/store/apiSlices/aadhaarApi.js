import { api } from "./api";

export const aadhaarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAadhaar: builder.query({
      query: () => ({
        url: `aadhaar`,
        headers: { unipeEmployeeId: getState().auth.unipeEmployeeId },
      }),
    }),
    generateAadhaarOtp: builder.mutation({
      query: (body) => ({
        url: `kyc/aadhaar-generate-otp`,
        method: "POST",
        body: body,
      }),
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
    overrideExisting: true,
  }),
});

export const {
  useGetAadhaarQuery,
  useGenerateAadhaarOtpMutation,
  useVerifyAadhaarOtpMutation,
  useUpdateAadhaarMutation,
} = aadhaarApi;
