import { DUMMY_RES } from "../../constants/Strings";
import { store } from "../store";
import { api } from "./api";

export default DUMMY_RES;

export const cmsApi = api
  .enhanceEndpoints({ addTagTypes: ["getPersonalization", "getLocalization","getGroup"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCms: builder.query({
        query: (unipeEmployeeId) => ({
          url: `cms`,
          params: {
            unipeEmployeeId,
            language: store.getState()?.localization?.language,
          },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          console.log("cms:", response);
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
        providesTags: ["getLocalization"],
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
        providesTags: ["getLocalization"],
        transformResponse: (response) => {
          console.log("Language Strings: ", response);
          return response?.body;
        },
        transformErrorResponse: (response) => {
          return response;
        },
      }),
      getCmsGroup: builder.query({
        query: ({ group, language }) => ({
          url: `cms`,
          params: {
            group,
            language,
          },
        }),
        transformResponse: (response) => {
          console.log("Language Strings: ", response);
          return response?.body;
        },
        providesTags: ["getGroup"],
      }),
      updateCms: builder.mutation({
        query: ({ contentType, content }) => ({
          url: `cms`,
          method: "POST",
          body: {
            contentType,
            content,
            unipeEmployeeId: store.getState()?.auth?.unipeEmployeeId,
            language: store.getState()?.localization?.language,
          },
        }),
        invalidatesTags: ["getPersonalization"],
      }),
      surveySubmission: builder.mutation({
        query: (body) => ({
          url: `cms`,
          method: "POST",
          body: body,
        }),
      }),
    }),

    overrideExisting: true,
  });

export const {
  useGetCmsQuery,
  useGetCmsLanguageListQuery,
  useLazyGetCmsLanguageStringsQuery,
  useGetCmsLanguageStringsQuery,
  useGetCmsGroupQuery,
  useSurveySubmissionMutation,
} = cmsApi;

// Language Store
