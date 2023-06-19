import { COLORS } from "../../constants/Theme";
import { api } from "./api";

export const cmsApi = api
  .enhanceEndpoints({ addTagTypes: ["getPersonalization"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCms: builder.query({
        query: (unipeEmployeeId) => ({
          url: `cms`,
          params: { unipeEmployeeId, x: 1 },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          return response?.body;
        },
      }),
    }),
    overrideExisting: true,
  });

export const { useGetCmsQuery } = cmsApi;
