import { api } from "./api";

const transformErrorResponse = (error) => {
  console.log("error", error);
  return error.data.error;
};

export const ewaApi = api
  .enhanceEndpoints({
    addTagTypes: ["getOffers", "getOffer", "getDisbursement"],
  })
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
        transformErrorResponse,
      }),
      getOffer: builder.query({
        query: (offerId) => ({
          url: `ewa/offer`,
          params: { offerId },
        }),
        providesTags: ["getOffer"],
        transformResponse: (response) => {
          console.log("response", response);
          return response?.body;
        },
        transformErrorResponse,
      }),
      updateOffer: builder.mutation({
        query: (body) => ({
          url: `ewa/offer`,
          method: "POST",
          body: body,
        }),
        transformErrorResponse,
      }),
      updateKyc: builder.mutation({
        query: (body) => ({
          url: `ewa/kyc`,
          method: "POST",
          body: body,
        }),
        transformErrorResponse,
      }),
      updateAgreement: builder.mutation({
        query: (body) => ({
          url: `ewa/agreement`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["getOffers"],
        transformErrorResponse,
      }),
      getDisbursement: builder.query({
        query: ({ unipeEmployeeId, offerId }) => ({
          url: `ewa/disbursement`,
          params: { unipeEmployeeId, offerId },
        }),
        providesTags: ["getDisbursement"],
        transformErrorResponse,
      }),
      disbursementFeedback: builder.mutation({
        query: (body) => ({
          url: `cms`,
          method: "POST",
          body: body,
        }),
        transformErrorResponse,
        // invalidatesTags: ["disbursementFeedback"],
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetOffersQuery,
  useGetOfferQuery,
  useUpdateOfferMutation,
  useUpdateKycMutation,
  useUpdateAgreementMutation,
  useGetDisbursementQuery,
  useDisbursementFeedbackMutation,
} = ewaApi;
