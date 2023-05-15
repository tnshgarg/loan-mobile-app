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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result: ", result);
  if (result.error && result.error.status === 401) {
    console.log("401 error");
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});
