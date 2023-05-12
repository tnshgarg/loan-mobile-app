import { api } from "./api";

export const mandateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMandate: builder.query({
      query: (unipeEmployeeId) => ({
        url: `mandate`,
        params: { unipeEmployeeId },
      }),
    }),
    updateMandate: builder.mutation({
      query: (body) => ({
        url: `mandate`,
        method: "POST",
        body: body,
      }),
    }),
    overrideExisting: true,
  }),
});

export const { useGetMandateQuery, useUpdateMandateMutation } = mandateApi;
