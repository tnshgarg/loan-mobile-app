import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KYC_SERVICE_URL } from "../../services/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: KYC_SERVICE_URL,
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.kycServiceToken;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc4MDQ0NjYsInN1YiI6ImJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYiIsImNsaWVudF9pZCI6ImVtcGxveWVlLWFwcC1hcGkiLCJ0eXBlIjoiZW1wbG95ZWUifQ.JwJsc-kv3_9hLscVir37Y5ss9Zp5h_m2zeG691k84C8";
    console.log("Service Token: ", token);
    if (token) {
      headers.set("Authorization", token);
      headers.set("Content-Type", "multipart/form-data");
    }
    return headers;
  },
});

const createUploadMutation = (builder, url) =>
  builder.mutation({
    query: (bodyFormData) => {
      console.log({ bodyFormData });
      return {
        url,
        method: "POST",
        body: bodyFormData,
      };
    },
    transformErrorResponse: (err) => {
      console.log("Service error: ", err);
      return {
        status: err.status,
        detail: err?.data?.detail,
      };
    },
    invalidatesTags: ["getKycStatus"],
  });

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  tagTypes: [],
  baseQuery,
  endpoints: (builder) => ({
    uploadProfilePic: createUploadMutation(builder, "/profile-pic"),
  }),
});

export const { useUploadProfilePicMutation } = serviceApi;
