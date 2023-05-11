import { api } from "./api";

export const panApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPan: builder.query({
      query: () => ({
        url: `pan`,
        headers: { unipeEmployeeId: getState().auth.unipeEmployeeId },
      }),
      transformResponse: (response) => response.response,
    }),
    verifyPan: builder.mutation({
      query: (body) => ({
        url: `kyc/pan-fetch-details`,
        method: "POST",
        body: body,
      }),
    }),
    updatePan: builder.mutation({
      query: (body) => ({
        url: `pan`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
    overrideExisting: true,
  }),
});

export const {
  useGetPanQuery,
  useVerifyPanMutation,
  useUpdatePanMutation,
} = panApi;
