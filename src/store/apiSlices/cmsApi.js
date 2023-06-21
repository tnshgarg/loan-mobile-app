import { DUMMY_RES } from "../../constants/Strings";
import { store } from "../store";
import { api } from "./api";

export const cmsApi = api
  .enhanceEndpoints({ addTagTypes: ["getPersonalization"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCms: builder.query({
        query: (unipeEmployeeId) => ({
          url: `cms`,
          params: {
            unipeEmployeeId,
            x: 1,
            language: store.getState().localization.language,
          },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          return response?.body;
          // return DUMMY_RES;
        },
      }),
      getCmsLanguageList: builder.query({
        query: () => ({
          url: `cms`,
          params: {
            group: "language_list",
          },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          console.log("Language List: ", response);
          return response?.body;
        },
      }),
      getCmsLanguageStrings: builder.query({
        query: (language) => ({
          url: `cms`,
          params: {
            group: "strings",
            language: language,
          },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          console.log("Language Strings: ", response);
          return response?.body;
        },
        transformErrorResponse: (response) => {
          return DUMMY_RES;
        },
      }),
    }),

    overrideExisting: true,
  });

export const {
  useGetCmsQuery,
  useGetCmsLanguageListQuery,
  useLazyGetCmsLanguageStringsQuery,
  useGetCmsLanguageStringsQuery,
} = cmsApi;

// Language Store
