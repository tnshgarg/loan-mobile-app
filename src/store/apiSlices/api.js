import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { EMPLOYEE_API_URL } from "../../services/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: EMPLOYEE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["getAadhaar", "getBank"],
  endpoints: () => ({}),
});
