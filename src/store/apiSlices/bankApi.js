import { api } from "./api";

export const bankApi = api
  .enhanceEndpoints({ addTagTypes: ["getBank"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBank: builder.query({
        query: (unipeEmployeeId) => ({
          url: `bank`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getBank"],
        transformResponse: (response) => response.body,
      }),
      verifyBank: builder.mutation({
        query: (body) => ({
          url: `kyc/bank-verify-account`,
          method: "POST",
          body: body,
        }),
        transformResponse: (response) => response.response,
        transformErrorResponse: (error) => {
          console.log({ error });
          return error || { message: "Unknown Error!" };
        },
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

export const { useGetBankQuery, useVerifyBankMutation, useUpdateBankMutation } =
  bankApi;
