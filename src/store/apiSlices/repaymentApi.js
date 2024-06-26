import { getVersion } from "react-native-device-info";
import { api } from "./api";

export const repaymentApi = api
  .enhanceEndpoints({ addTagTypes: ["getRepayment"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRepayment: builder.query({
        query: (unipeEmployeeId) => ({
          url: `ewa/repayment`,
          params: { unipeEmployeeId },
          headers: { "X-Unipe-App-Version": getVersion() },
        }),
        providesTags: ["getRepayment"],
        transformResponse: (response) => {
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
        invalidatesTags: ["getRepayment", "getOffers"],
      }),
    }),
    overrideExisting: true,
  });

export const { useGetRepaymentQuery, useUpdateRepaymentMutation } =
  repaymentApi;
