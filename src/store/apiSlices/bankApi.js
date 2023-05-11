import { api } from "./api";

export const bankApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBank: builder.query({
      query: () => ({
        url: `bank`,
        headers: { unipeEmployeeId: getState().auth.unipeEmployeeId },
      }),
      transformResponse: (response) => response.response,
    }),
    verifyBank: builder.mutation({
      query: (body) => ({
        url: `kyc/bank-verify-account`,
        method: "POST",
        body: body,
      }),
    }),
    updateBank: builder.mutation({
      query: (body) => ({
        url: `bank`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
    overrideExisting: true,
  }),
});

export const {
  usegetBankQuery,
  useVerifyBankMutation,
  useUpdateBankMutation,
} = bankApi;
