import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KYC_SERVICE_URL } from "../../services/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: KYC_SERVICE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.kycServiceToken;
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTgwNDU0MDYsInN1YiI6ImJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYiIsImNsaWVudF9pZCI6ImVtcGxveWVlLWFwcC1hcGkiLCJ0eXBlIjoiZW1wbG95ZWUifQ.rCPBshWSbJxzoCvrlAlSlS_3raYyu8jJa7FW9Rv4bI0";
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
    uploadProfilePic: createUploadMutation(builder, "/kyc-service/profile-pic"),
  }),
});

export const { useUploadProfilePicMutation } = serviceApi;
