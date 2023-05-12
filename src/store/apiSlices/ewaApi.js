import { api } from "./api";

export const ewaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: (unipeEmployeeId) => ({
        url: `ewa/offers`,
        params: {unipeEmployeeId}
      }),
      providesTags: ["Offers"],
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
      query: ({ offerId }) => ({
        url: `ewa/disbursement`,
        headers: {
          unipeEmployeeId: getState().auth.unipeEmployeeId,
          offerId: offerId,
        },
      }),
    }),
    overrideExisting: true,
  }),
});

export const {
  useGetOffersQueryMutation,
  useUpdateOfferMutation,
  useUpdateKycMutation,
  useUpdateAgreementMutation,
  useGetDisbursementQuery,
} = ewaApi;
