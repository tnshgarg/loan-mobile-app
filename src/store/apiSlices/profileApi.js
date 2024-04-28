import { api } from "./api";

export const profileApi = api
  .enhanceEndpoints({ addTagTypes: ["getProfile"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProfile: builder.query({
        query: (unipeEmployeeId) => ({
          url: `profile`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getProfile"],
        transformResponse: (response) => response.body,
      }),
      updateProfile: builder.mutation({
        query: (body) => ({
          url: `profile`,
          method: "POST",
          body: body,
        }),
        transformResponse: (response) => response.response,
        invalidatesTags: ["getKycStatus"],
      }),
    }),
    overrideExisting: true,
  });

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
