import { api } from "./api";

export const ewaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => ({
        url: `ewa/offers`,
        headers: { unipeEmployeeId: getState().auth.unipeEmployeeId },
      }),
      providesTags: ["Offers"],
      transformResponse: (response) => response.response,
    }),
    updateOffer: builder.mutation({
      query: (body) => ({
        url: `ewa/offer`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
    updateKyc: builder.mutation({
      query: (body) => ({
        url: `ewa/kyc`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
    updateAgreement: builder.mutation({
      query: (body) => ({
        url: `ewa/agreement`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
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
      transformResponse: (response) => response.response,
    }),
    overrideExisting: true,
  }),
});

export const {
  getOffers,
  updateOffer,
  updateKyc,
  updateAgreement,
  getDisbursement,
} = ewaApi;
