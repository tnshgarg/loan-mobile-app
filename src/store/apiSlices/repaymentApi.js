import { api } from "./api";
import { getVersion } from "react-native-device-info";

export const repaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepayment: builder.query({
      query: (unipeEmployeeId) => ({
        url: `ewa/repayment`,
        params: { unipeEmployeeId },
        headers: { "X-Unipe-App-Version": getVersion() },
      }),
      transformResponse: (response) => {
        console.log("response", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log("response", response);
        return response;
      },
    }),
    updateRepayment: builder.mutation({
      query: (body) => ({
        url: `ewa/repayment`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetRepaymentQuery, useUpdateRepaymentMutation } =
  repaymentApi;
