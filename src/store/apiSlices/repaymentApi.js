import { api } from "./api";
import { getVersion } from "react-native-device-info";

export const repaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepayment: builder.query({
      query: () => ({
        url: `ewa/repayment`,
        headers: {
          unipeEmployeeId: getState().auth.unipeEmployeeId,
          "X-Unipe-App-Version": getVersion(),
        },
      }),
      transformResponse: (response) => response.response,
    }),
    updateRepayment: builder.mutation({
      query: (body) => ({
        url: `ewa/repayment`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response) => response.response,
    }),
  }),
});

export const {} = repaymentApi;
