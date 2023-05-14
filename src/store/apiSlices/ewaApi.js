import { api } from "./api";

export const ewaApi = api
  .enhanceEndpoints({ addTagTypes: ["getOffers", "getDisbursement"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getOffers: builder.query({
        query: (unipeEmployeeId) => ({
          url: `ewa/offers`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getOffers"],
        transformResponse: (response) => {
          console.log("response", response);
          return response;
        },
        transformErrorResponse: (response) => {
          console.log("response", response);
          return response;
        },
      }),
      updateOffer: builder.mutation({
        query: (body) => ({
          url: `ewa/offer`,
          method: "POST",
          body: body,
        }),
      }),
      updateKyc: builder.mutation({
        query: (body) => ({
          url: `ewa/kyc`,
          method: "POST",
          body: body,
        }),
      }),
      updateAgreement: builder.mutation({
        query: (body) => ({
          url: `ewa/agreement`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [],
      }),
      getDisbursement: builder.query({
        query: ({ unipeEmployeeId, offerId }) => ({
          url: `ewa/disbursement`,
          params: { unipeEmployeeId, offerId },
        }),
        providesTags: ["getDisbursement"],
      }),
      overrideExisting: true,
    }),
  });

export const {
  useGetOffersQuery,
  useUpdateOfferMutation,
  useUpdateKycMutation,
  useUpdateAgreementMutation,
  useGetDisbursementQuery,
} = ewaApi;
