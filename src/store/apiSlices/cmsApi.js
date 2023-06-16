import { COLORS } from "../../constants/Theme";
import { api } from "./api";

const DUMMY_RES = {
  home: [
    {
      type: "card",
      children: [
        {
          type: "image",
          url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        },
      ],
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
          children: [
            {
              type: "card",
              navigate: { type: "cms", screen: "blog_1" },
              children: [
                {
                  type: "twoColumn",
                  firstColumnWidth: "70%",
                  children: [
                    {
                      type: "container",
                      children: [
                        {
                          type: "title",
                          title: "What are the benefits of completing KYC?",
                        },
                      ],
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
              navigate: { type: "cms", screen: "blog_3" },
              children: [
                {
                  type: "twoColumn",
                  firstColumnWidth: "70%",
                  children: [
                    {
                      type: "container",
                      children: [
                        {
                          type: "title",
                          title:
                            "What are the benefits of Mandate Registration?",
                        },
                      ],
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
              navigate: { type: "cms", screen: "blog_5" },
              children: [
                {
                  type: "twoColumn",
                  firstColumnWidth: "70%",
                  children: [
                    {
                      type: "container",
                      children: [
                        {
                          type: "title",
                          title: "What are the benefits of Advance Salary?",
                        },
                      ],
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
              navigate: { type: "cms", screen: "blog_6" },
              children: [
                {
                  type: "twoColumn",
                  firstColumnWidth: "70%",
                  children: [
                    {
                      type: "container",
                      children: [
                        {
                          type: "title",
                          title: "How do I check my PF Balance?",
                        },
                      ],
                    },
                    {
                      type: "image",
                      url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "card",
      gradientColors: [COLORS.cardBackground, COLORS.cardBackground],
      children: [
        {
          type: "twoColumn",
          styling: { flexDirection: "row-reverse" },
          navigate: { type: "cms", screen: "blog_2" },

          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "Why Unipe",
                },
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
      gradientColors: [COLORS.cardBackground, COLORS.cardBackground],
      children: [
        {
          type: "twoColumn",
          styling: { flexDirection: "row-reverse" },
          navigate: { type: "cms", screen: "blog_4" },

          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "How Unipe Works?",
                },
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
  blogs: [
    {
      type: "card",
      navigate: { type: "cms", screen: "blog_1" },
      children: [
        {
          type: "twoColumn",
          firstColumnWidth: "70%",
          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "What are the benefits of completing KYC?",
                },
              ],
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
      navigate: { type: "cms", screen: "blog_2" },
      children: [
        {
          type: "twoColumn",
          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "Why Unipe?",
                },
                {
                  type: "subtitle",
                  title: "Lorem Ipsum is simply dumm typesetting industry.",
                },
                {
                  type: "iconText",
                  iconName: "video-outline",

                  title: "3 min video",
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
      navigate: { type: "cms", screen: "blog_3" },
      children: [
        {
          type: "twoColumn",
          firstColumnWidth: "70%",
          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "What are the benefits of Mandate Registration?",
                },
              ],
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
      navigate: { type: "cms", screen: "blog_4" },
      children: [
        {
          type: "twoColumn",
          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "How Unipe Works?",
                },
                {
                  type: "subtitle",
                  title: "Lorem Ipsum is simply dumm typesetting industry.",
                },
                {
                  type: "iconText",
                  iconName: "video-outline",

                  title: "3 min video",
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
      navigate: { type: "cms", screen: "blog_5" },
      children: [
        {
          type: "twoColumn",
          firstColumnWidth: "70%",
          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "What are the benefits of Advance Salary?",
                },
              ],
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
      navigate: { type: "cms", screen: "blog_6" },
      children: [
        {
          type: "twoColumn",
          firstColumnWidth: "70%",
          children: [
            {
              type: "container",
              children: [
                {
                  type: "title",
                  title: "How do I check my PF Balance?",
                },
              ],
            },
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
            },
          ],
        },
      ],
    },
  ],
  blog_1: [
    {
      key: 1,
      type: "blog",
      title: "Why Unipe?",
      subtitle: "hello",
      headingImage:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
      data: [
        {
          key: 1,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
        {
          key: 2,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
      ],
      questions: [
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
      ],
    },
  ],
  blog_2: [
    {
      key: 1,
      type: "blog",
      title: "Why Unipe?",
      subtitle: "hello",
      headingImage:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
      data: [
        {
          key: 1,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
        {
          key: 2,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
      ],
      questions: [
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
      ],
    },
  ],
  blog_3: [
    {
      key: 1,
      type: "blog",
      title: "Why Unipe?",
      subtitle: "hello",
      headingImage:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
      data: [
        {
          key: 1,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
        {
          key: 2,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
      ],
      questions: [
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
      ],
    },
  ],
  blog_4: [
    {
      key: 1,
      type: "blog",
      title: "Why Unipe?",
      subtitle: "hello",
      headingImage:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
      data: [
        {
          key: 1,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
        {
          key: 2,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
      ],
      questions: [
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
      ],
    },
  ],
  blog_5: [
    {
      key: 1,
      type: "blog",
      title: "Why Unipe?",
      subtitle: "hello",
      headingImage:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
      data: [
        {
          key: 1,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
        {
          key: 2,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
      ],
      questions: [
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
      ],
    },
  ],
  blog_6: [
    {
      key: 1,
      type: "blog",
      title: "Why Unipe?",
      subtitle: "hello",
      headingImage:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
      data: [
        {
          key: 1,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
        {
          key: 2,
          headingImage:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          heading: "What is e-Mandate",
          description:
            "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary ",
        },
      ],
      questions: [
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
        {
          title: "How to complete KYC Verification?",
          subtitle: "Search on the internet",
        },
      ],
    },
  ],
  miniPlacement: [
    {
      type: "mini_placement",
      leftIcon:
        "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
      title: "March Payslip is ready for download",
      cta: "Click here to see details",
    },
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
