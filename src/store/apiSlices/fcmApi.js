import { api } from "./api";

export const fcmApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateFcm: builder.mutation({
      query: (body) => ({
        url: `fcm`,
        method: "POST",
        body: body,
      }),
    }),
    overrideExisting: true,
  }),
});

export const { useUpdateFcmMutation } = fcmApi;
