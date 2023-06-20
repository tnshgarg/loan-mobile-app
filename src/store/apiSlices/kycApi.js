import { api } from "./api";

export const kycApi = api
  .enhanceEndpoints({ addTagTypes: ["getKycStatus"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getKyc: builder.query({
        query: (unipeEmployeeId) => ({
          url: `kyc`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getKycStatus"],
        transformResponse: (response) => {
          console.log({ response });
          const body = response.body;

          return {
            ...body,
            isAadhaarSuccess: body?.aadhaar?.verifyStatus === "SUCCESS",
            isPanSuccess: body?.pan?.verifyStatus === "SUCCESS",
            isBankSuccess: body?.bank?.verifyStatus === "SUCCESS",
            isProfileSuccess: body?.profile?.profileComplete === true,
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const { useGetKycQuery, useLazyGetKycQuery } = kycApi;
