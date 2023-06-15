import { api } from "./api";
import Blog1 from "../../assets/Blog1.svg";
import Blog2 from "../../assets/Blog2.svg";
import Blog3 from "../../assets/Blog3.svg";
import Blog4 from "../../assets/Blog4.svg";

const DUMMY_RES = {
  home: [
    {
      type: "banner",
      url: "https://d22ss3ef1t9wna.cloudfront.net/fcm_test_1.jpeg",
    },
    {
      type: "section",
      title: "Learn With Us",
      leftIcon:
        "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
      ctaText: "SEE ALL",
      ctaRoute: "LearnWithUs",
      onPressCta: { stack: "LearnWithUs" },
      children: [
        {
          type: "swiper",
          urls: [
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/carousel_1.png",
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/carousel_1.png",
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/carousel_1.png",
          ],
          banners: [
            {
              title: "What are the benefits of completing KYC?",
              imageUri: <Blog1 />,
            },
            {
              title: "Why Unipe?",
              subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
              description: "3 min video",
              desIcon: "video-outline",
              thumbnail:
                "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
            },
            {
              title: "What are the benefits of Mandate Registration?",
              imageUri: <Blog2 />,
              titleStyle: "strong",
            },
            {
              title: "How Unipe Works?",
              subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
              description: "3 min video",
              desIcon: "video-outline",
              thumbnail:
                "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
            },
            {
              title: "What are the benefits of Advance Salary?",
              imageUri: <Blog3 />,
              titleStyle: "strong",
            },
            {
              title: "How do I check my PF Balance?",
              imageUri: <Blog4 />,
              titleStyle: "strong",
            },
          ],
        },
      ],
    },
    {
      type: "column",
      title: "Why Unipe?",
      subtitle: "Lorem Ipsum is simply text of the printing",
      children: [
        {
          type: "video",
          videoUri: "",
          thumbnail:
            "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        },
      ],
    },
    {
      type: "column",
      title: "How Unipe Works?",
      subtitle: "Lorem Ipsum is simply text of the printing",
      children: [
        {
          type: "video",
          videoUri: "",
          thumbnail:
            "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        },
      ],
    },
    {
      type: "section",
      title: "User Story",
      leftIcon:
        "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/Userstory.png",
      children: [
        {
          type: "review",
          testimony:
            "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.”",
          name: "Manager",
          address: "Neemrana, Rajasthan",
          imageUri:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          stars: 5,
        },
        {
          type: "review",
          testimony:
            "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.”",
          name: "Manager",
          address: "Neemrana, Rajasthan",
          imageUri:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          stars: 5,
        },
      ],
    },
  ],
};

export const cmsApi = api
  .enhanceEndpoints({ addTagTypes: ["getPersonalization"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCms: builder.query({
        query: (unipeEmployeeId) => ({
          url: `ping`,
          params: { unipeEmployeeId },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          return DUMMY_RES;
        },
      }),
    }),
    overrideExisting: true,
  });

export const { useGetCmsQuery } = cmsApi;
