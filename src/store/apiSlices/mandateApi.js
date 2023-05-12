import { api } from "./api";

export const mandateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMandate: builder.query({
      query: (unipeEmployeeId) => ({
        url: `mandate`,
        params: { unipeEmployeeId },
      }),
      transformResponse: (response) => response.body,
    }),
    updateMandate: builder.mutation({
      query: (body) => ({
        url: `mandate`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
    overrideExisting: true,
  }),
});

export const { useGetMandateQuery, useUpdateMandateMutation } = mandateApi;
