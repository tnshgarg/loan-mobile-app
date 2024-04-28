import analytics from "@react-native-firebase/analytics";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDeviceName, getUniqueId } from "react-native-device-info";
import AlertHandler from "../../services/alertHandler";
import { EMPLOYEE_API_URL } from "../../services/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: EMPLOYEE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("x-unipe-device-id", getUniqueId());
      headers.set("x-unipe-device-name", getDeviceName());
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error) {
    console.log("result?.error", args, api, result?.error);
    analytics().logEvent(
      `${result?.meta?.request?.url
        ?.split("?")[0]
        .split(EMPLOYEE_API_URL)[1]
        .replace(/[^A-Za-z 0-9]/g, "_")}_${result?.meta?.request?.method}_${
        result?.error?.status
      }`
    );
    if (result?.error?.status === 401) {
      AlertHandler.handle401Alert();
    } else if (result?.error?.status === 404) {
      return result;
    } else {
      //Alert.alert("Oops", result?.error?.data?.error?.message || "Something went wrong please try again later");
      console.log("Other error");
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});
