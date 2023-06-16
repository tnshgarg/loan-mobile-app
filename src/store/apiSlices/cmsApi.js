import { api } from "./api";
import Blog1 from "../../assets/Blog1.svg";
import Blog2 from "../../assets/Blog2.svg";
import Blog3 from "../../assets/Blog3.svg";
import Blog4 from "../../assets/Blog4.svg";

const DUMMY_RES = {
  home: [
    // {
    //   type: "banner",
    //   url: "https://d22ss3ef1t9wna.cloudfront.net/fcm_test_1.jpeg",
    // },
    {
      type: "swiper",
      children: [
        {
          type: "card",
          children: [
            {
              type: "twoColumn",
              firstColumnWidth: "70%",
              children: [
                {
                  type: "title",
                  title: "What are the benefits of Mandate Registration?",
                  // children: [
                  //   {
                  //     type: "subtitle",
                  //     title: "What are the benefits of Mandate Registration?",
                  //   },
                  // ],
                },
                {
                  type: "image",
                  url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
                },
              ],
            },
          ],
        },
        {
          type: "card",
          children: [
            {
              type: "twoColumn",
              // firstColumnWidth: "70%",
              children: [
                {
                  type: "title",
                  title: "Why Unipe?",
                  children: [
                    {
                      type: "subtitle",
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
                    },
                  ],
                },
                {
                  type: "video",
                  thumbnail:
                    "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
                },
              ],
            },
          ],
        },
        {
          type: "card",
          children: [
            {
              type: "twoColumn",
              firstColumnWidth: "70%",
              children: [
                {
                  type: "title",
                  title: "What are the benefits of Advance Salary?",
                  // children: [
                  //   {
                  //     type: "subtitle",
                  //     title: "What are the benefits of Mandate Registration?",
                  //   },
                  // ],
                },
                {
                  type: "image",
                  url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
                },
              ],
            },
          ],
        },

        // {
        //   title: "What are the benefits of Mandate Registration?",
        //   imageUri:
        //     "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        //   titleStyle: "strong",
        //   type: "card",
        // },
        // {
        //   title: "How Unipe Works?",
        //   subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
        //   description: "3 min video",
        //   desIcon: "video-outline",
        //   thumbnail:
        //     "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        //   type: "card",
        // },
        // {
        //   title: "What are the benefits of Advance Salary?",
        //   imageUri:
        //     "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        //   titleStyle: "strong",
        //   type: "card",
        // },
        // {
        //   title: "How do I check my PF Balance?",
        //   imageUri:
        //     "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        //   titleStyle: "strong",
        //   type: "card",
        // },
      ],
    },

    // {
    //   type: "section",
    //   title: "Learn With Us",
    //   leftIcon:
    //     "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
    //   ctaText: "SEE ALL",
    //   ctaRoute: "LearnWithUs",
    //   onPressCta: { stack: "LearnWithUs" },
    //   children: [
    //     {
    //       type: "swiper",
    //       children: [
    //         {
    //           title: "What are the benefits of completing KYC?",
    //           imageUri: <Blog1 />,
    //         },
    //         {
    //           title: "Why Unipe?",
    //           subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
    //           description: "3 min video",
    //           desIcon: "video-outline",
    //           thumbnail:
    //             "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    //         },
    //         {
    //           title: "What are the benefits of Mandate Registration?",
    //           imageUri: <Blog2 />,
    //           titleStyle: "strong",
    //         },
    //         {
    //           title: "How Unipe Works?",
    //           subtitle: "Lorem Ipsum is simply dumm typesetting industry.",
    //           description: "3 min video",
    //           desIcon: "video-outline",
    //           thumbnail:
    //             "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    //         },
    //         {
    //           title: "What are the benefits of Advance Salary?",
    //           imageUri: <Blog3 />,
    //           titleStyle: "strong",
    //         },
    //         {
    //           title: "How do I check my PF Balance?",
    //           imageUri: <Blog4 />,
    //           titleStyle: "strong",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: "column",
    //   title: "Why Unipe?",
    //   subtitle: "Lorem Ipsum is simply text of the printing",
    //   children: [
    //     {
    //       type: "video",
    //       videoUri: "",
    //       thumbnail:
    //         "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    //     },
    //   ],
    // },
    // {
    //   type: "column",
    //   title: "How Unipe Works?",
    //   subtitle: "Lorem Ipsum is simply text of the printing",
    //   children: [
    //     {
    //       type: "video",
    //       videoUri: "",
    //       thumbnail:
    //         "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    //     },
    //   ],
    // },
    // {
    //   type: "section",
    //   title: "User Story",
    //   leftIcon:
    //     "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/Userstory.png",
    //   children: [
    //     {
    //       type: "review",
    //       testimony:
    //         "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.”",
    //       name: "Manager",
    //       address: "Neemrana, Rajasthan",
    //       imageUri:
    //         "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    //       stars: 5,
    //     },
    //     {
    //       type: "review",
    //       testimony:
    //         "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.”",
    //       name: "Manager",
    //       address: "Neemrana, Rajasthan",
    //       imageUri:
    //         "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    //       stars: 5,
    //     },
    //   ],
    // },
  ],
};

export default DUMMY_RES;

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
