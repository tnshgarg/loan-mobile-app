import { api } from "./api";

export const panApi = api
  .enhanceEndpoints({ addTagTypes: ["getPan"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPan: builder.query({
        query: (unipeEmployeeId) => ({
          url: `pan`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getPan"],
        transformResponse: (response) => response.body,
      }),
      verifyPan: builder.mutation({
        invalidatesTags: ["getKycStatus"],
        query: (body) => ({
          url: `kyc/pan-fetch-details`,
          method: "POST",
          body: body,
        }),
      }),
      updatePan: builder.mutation({
        invalidatesTags: ["getKycStatus"],
        query: (body) => ({
          url: `pan`,
          method: "POST",
          body: body,
        }),
        transformResponse: (response) => response.response,
      }),
    }),
    overrideExisting: true,
  });

export const { useGetPanQuery, useVerifyPanMutation, useUpdatePanMutation } =
  panApi;
