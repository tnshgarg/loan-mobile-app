import { api } from "./api";

export const mandateApi = api
  .enhanceEndpoints({ addTagTypes: ["getMandate"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMandate: builder.query({
        query: (unipeEmployeeId) => ({
          url: `mandate`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getMandate"],
      }),
      getMandateOptions: builder.query({
        query: (unipeEmployeeId) => ({
          url: `mandate/options`,
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

export const { useGetMandateQuery, useGetMandateOptionsQuery, useUpdateMandateMutation } = mandateApi;
