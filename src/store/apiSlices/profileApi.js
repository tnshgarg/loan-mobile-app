import { api } from "./api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `profile`,
        headers: { unipeEmployeeId: getState().auth.unipeEmployeeId },
      }),
      transformResponse: (response) => response.response,
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: `profile`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
    overrideExisting: true,
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
