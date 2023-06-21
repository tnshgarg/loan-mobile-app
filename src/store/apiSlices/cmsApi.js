import { COLORS } from "../../constants/Theme";
import { api } from "./api";

export const DUMMY_RES = {
  home: [
    {
      type: "container",
      styling: { padding: "4%" },
      children: [
        {
          type: "banner",
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBanner.png",
              styling: {
                marginBottom: "-40%",
                marginTop: "-20%",
                alignSelf: "center",
              },
            },
            {
              type: "twoColumn",
              widths: ["48%", "48%"],
              styling: { border: "1px solid black" },
              children: [
                {
                  type: "card",

                  children: [
                    {
                      type: "image",
                      url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBannerCurrentContest.png",
                    },
                  ],
                },
                {
                  type: "card",
                  gradientColors: ["#fff", "#fff"],
                  children: [
                    {
                      type: "image",
                      url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBannerLastMonthWinners.png",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "section",
          title: "Learn With Us",
          gradientColors: ["#FFFFFF", "#FFFFFF"],
          styling: { padding: 0, marginTop: "10%" },
          leftIcon:
            "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsIcon.png",
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
                      widths: ["70%", "30%"],
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
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
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
                      widths: ["70%", "30%"],
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
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
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
                      widths: ["70%", "30%"],
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
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
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
                      widths: ["70%", "30%"],
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
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
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
          navigate: { type: "cms", screen: "blog_2" },
          children: [
            {
              type: "twoColumn",
              styling: { flexDirection: "row-reverse" },
              navigate: { type: "cms", screen: "blog_2" },

              children: [
                {
                  type: "container",
                  styling: { marginLeft: "5%" },
                  children: [
                    {
                      type: "title",
                      title: "Why Unipe?",
                    },
                    {
                      type: "subtitle",
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
                    },
                  ],
                },
                {
                  type: "video",
                  videoUri: "ux6XLNiEpLs",
                  size: "small",
                  thumbnail:
                    "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                },
              ],
            },
          ],
        },
        {
          type: "card",
          gradientColors: [COLORS.cardBackground, COLORS.cardBackground],
          navigate: { type: "cms", screen: "blog_4" },
          children: [
            {
              type: "twoColumn",
              styling: { flexDirection: "row-reverse" },
              navigate: { type: "cms", screen: "blog_4" },

              children: [
                {
                  type: "container",
                  styling: { marginLeft: "5%" },
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
                  videoUri: "ux6XLNiEpLs",
                  size: "small",
                  thumbnail:
                    "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                },
              ],
            },
          ],
        },

        {
          type: "section",
          title: "User Story",
          gradientColors: ["#FFFFFF", "#FFFFFF"],
          styling: { padding: 0, marginTop: "10%" },
          leftIcon:
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
          children: [
            {
              type: "container",
              styling: { padding: "3%" },
              children: [
                {
                  type: "container",
                  styling: { flexDirection: "row", marginVertical: "3%" },
                  children: [
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                  ],
                },
                {
                  type: "subtitle",
                  styling: { fontSize: 16, lineHeight: 24 },
                  title:
                    "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.”",
                },
                {
                  type: "twoColumn",
                  widths: ["11%", "89%"],
                  styling: {
                    margin: 0,
                    marginTop: "3%",
                  },
                  children: [
                    {
                      type: "image",
                      styling: { borderRadius: 50 },
                      url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
                    },
                    {
                      type: "container",
                      styling: { marginLeft: "2%" },
                      children: [
                        {
                          type: "subtitle",
                          title: "Manager",
                          styling: { marginBottom: -5 },
                        },
                        { type: "subtitle", title: "Neemrana, Rajasthan" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "container",
              styling: { padding: "3%" },
              children: [
                {
                  type: "container",
                  styling: { flexDirection: "row", marginVertical: "3%" },
                  children: [
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                    {
                      type: "icon",
                      iconName: "star",
                      iconSize: 24,
                      iconColor: "#F9C700",
                    },
                  ],
                },
                {
                  type: "subtitle",
                  styling: { fontSize: 16, lineHeight: 24 },
                  title:
                    "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.”",
                },
                {
                  type: "twoColumn",
                  widths: ["11%", "89%"],
                  styling: {
                    margin: 0,
                    marginTop: "3%",
                  },
                  children: [
                    {
                      type: "image",
                      styling: { borderRadius: 50 },
                      url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
                    },
                    {
                      type: "container",
                      styling: { marginLeft: "2%" },
                      children: [
                        {
                          type: "subtitle",
                          title: "Manager",
                          styling: { marginBottom: -5 },
                        },
                        { type: "subtitle", title: "Neemrana, Rajasthan" },
                      ],
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
      type: "footer",
    },
  ],

  blogs: [
    {
      type: "card",
      navigate: { type: "cms", screen: "blog_1" },
      children: [
        {
          type: "twoColumn",
          widths: ["30%", "70%"],
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
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
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
              videoUri: "ux6XLNiEpLs",
              size: "small",
              thumbnail:
                "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
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
          widths: ["30%", "70%"],
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
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
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
              videoUri: "ux6XLNiEpLs",
              thumbnail:
                "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
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
          widths: ["30%", "70%"],
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
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
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
          widths: ["30%", "70%"],
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
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
            },
          ],
        },
      ],
    },
  ],
  blog_1: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",

    data: [
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            type: "container",
            children: [
              { type: "title", title: "What is KYC?" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee’s identity while offering features like advance salrary.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Why Complete KYC?" },
              {
                type: "subtitle",
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Risks of Incomplete KYC" },
              {
                type: "subtitle",
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Unlock Advance with KYC" },
              {
                type: "subtitle",
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Advance without KYC" },
              {
                type: "subtitle",
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q. How to complete KYC Verification?",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I don't have PAN Card",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I have not received my advance salary",
            subtitle: "A. Search on the internet",
          },
        ],
      },
    ],
  },
  blog_2: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",

    data: [
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            type: "container",
            children: [
              { type: "title", title: "What is KYC?" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee’s identity while offering features like advance salrary.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Why Complete KYC?" },
              {
                type: "subtitle",
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Risks of Incomplete KYC" },
              {
                type: "subtitle",
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Unlock Advance with KYC" },
              {
                type: "subtitle",
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Advance without KYC" },
              {
                type: "subtitle",
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q. How to complete KYC Verification?",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I don't have PAN Card",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I have not received my advance salary",
            subtitle: "A. Search on the internet",
          },
        ],
      },
    ],
  },
  blog_3: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",

    data: [
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            type: "container",
            children: [
              { type: "title", title: "What is KYC?" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee’s identity while offering features like advance salrary.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Why Complete KYC?" },
              {
                type: "subtitle",
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Risks of Incomplete KYC" },
              {
                type: "subtitle",
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Unlock Advance with KYC" },
              {
                type: "subtitle",
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Advance without KYC" },
              {
                type: "subtitle",
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q. How to complete KYC Verification?",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I don't have PAN Card",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I have not received my advance salary",
            subtitle: "A. Search on the internet",
          },
        ],
      },
    ],
  },
  blog_4: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",

    data: [
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            type: "container",
            children: [
              { type: "title", title: "What is KYC?" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee’s identity while offering features like advance salrary.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Why Complete KYC?" },
              {
                type: "subtitle",
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Risks of Incomplete KYC" },
              {
                type: "subtitle",
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Unlock Advance with KYC" },
              {
                type: "subtitle",
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Advance without KYC" },
              {
                type: "subtitle",
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q. How to complete KYC Verification?",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I don't have PAN Card",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I have not received my advance salary",
            subtitle: "A. Search on the internet",
          },
        ],
      },
    ],
  },
  blog_5: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",

    data: [
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            type: "container",
            children: [
              { type: "title", title: "What is KYC?" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee’s identity while offering features like advance salrary.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Why Complete KYC?" },
              {
                type: "subtitle",
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Risks of Incomplete KYC" },
              {
                type: "subtitle",
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Unlock Advance with KYC" },
              {
                type: "subtitle",
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Advance without KYC" },
              {
                type: "subtitle",
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q. How to complete KYC Verification?",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I don't have PAN Card",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I have not received my advance salary",
            subtitle: "A. Search on the internet",
          },
        ],
      },
    ],
  },
  blog_6: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",

    data: [
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            type: "container",
            children: [
              { type: "title", title: "What is KYC?" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee’s identity while offering features like advance salrary.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Why Complete KYC?" },
              {
                type: "subtitle",
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Risks of Incomplete KYC" },
              {
                type: "subtitle",
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { marginLeft: "15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Unlock Advance with KYC" },
              {
                type: "subtitle",
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["30%", "70%"],
        children: [
          {
            type: "image",
            styling: { marginLeft: "-15%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "Advance without KYC" },
              {
                type: "subtitle",
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q. How to complete KYC Verification?",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I don't have PAN Card",
            subtitle: "A. Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "Q. I have not received my advance salary",
            subtitle: "A. Search on the internet",
          },
        ],
      },
    ],
  },

  kyc_help: {
    screenTitle: "Help - KYC Verification",
    data: [
      {
        type: "container",
        styling: { padding: "4%" },
        children: [
          {
            type: "twoColumn",
            widths: ["35%", "65%"],
            styling: { margin: 0 },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/Logo.png",
                styling: {
                  width: "100%",
                  flex: 1,
                  aspectRatio: 1.6,
                },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                  // backgroundColor: "black",
                },
                children: [
                  {
                    type: "title",
                    title: "KYC verification in just 3 simple steps",
                  },
                  {
                    type: "subtitle",
                    title: "Verify your identity & complete your full KYC",
                  },
                ],
              },
            ],
          },
          {
            type: "button",
            title: "Start KYC",
            variant: "filled",
            clickType: "navigation",
            styling: { marginVertical: "10%" },
            navigate: { type: "app", screen: "KycProgress" },
          },
          {
            type: "video",
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              {
                type: "badge",
                text: "Step 1",
              },
              {
                type: "title",
                title: "Verify Aadhaar",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "Enter your Aadhaar number and complete verification with OTP",
                styling: { fontSize: 16 },
              },
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/step1.png",
                styling: { marginTop: "5%" },
              },
            ],
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              { type: "badge", text: "Step 2" },
              {
                type: "title",
                title: "Verify PAN Card",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title: "Enter your PAN Card number and verify the details.",
                styling: { fontSize: 16 },
              },
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/step2.png",
                styling: { marginTop: "5%" },
              },
            ],
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              { type: "badge", text: "Step 3" },
              {
                type: "title",
                title: "Add Bank Account",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "Enter your bank account number to receive the advance salary money",
                styling: { fontSize: 16 },
              },
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/step3.png",
                styling: { marginTop: "5%" },
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Frequently Asked Questions",
        children: [
          {
            type: "collapsibleList",
            title: "Q: Do I need to pay for KYC",
            subtitle: "A: No. KYC is FREE.",
          },
          {
            type: "collapsibleList",
            title: "Q: Why do I need to do KYC?",
            subtitle:
              "A: As per RBI Regulations, KYC verification is mandatory.",
          },
          {
            type: "collapsibleList",
            title: "Q: What are the required documents for KYC?",
            subtitle:
              "A: Aadhaar Card and PAN Card are mandatory to initiate KYC process.",
          },
          {
            type: "collapsibleList",
            title: "Q: How much time will KYC Process take?",
            subtitle: "A: KYC happens instantly with government APIs.",
          },
          {
            type: "collapsibleList",
            title: "Q: What happens if I don’t complete my minimum KYC?",
            subtitle: "A: You won't be able to withdraw your advance salary.",
          },
        ],
      },
      {
        type: "footer",
      },
      // {
      //   type: "overlay",
      //   visible: true,
      //   children: [
      //     {
      //       type: "button",
      //       title: "Start KYC",
      //       variant: "filled",
      //       clickType: "navigation",
      //       navigate: { type: "app", screen: "KycProgress" },
      //     },
      //   ],
      // },
    ],
  },

  aadhaar_help: {
    screenTitle: "Help - Aadhaar Verification",
    data: [
      {
        type: "container",
        styling: { padding: "4%" },
        children: [
          {
            type: "twoColumn",
            widths: ["35%", "65%"],
            styling: { margin: 0 },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/Logo.png",
                styling: {
                  width: "100%",
                  flex: 1,
                  aspectRatio: 1.6,
                },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                  // backgroundColor: "black",
                },
                children: [
                  { type: "title", title: "How to verify Aadhaar?" },
                  { type: "subtitle", title: "Follow this 3-step process" },
                ],
              },
            ],
          },
          {
            type: "button",
            title: "Verify Aadhaar",
            variant: "filled",
            clickType: "navigation",
            styling: { marginVertical: "10%" },
          },
          {
            type: "video",

            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              {
                type: "badge",
                text: "Step 1",
              },
              {
                type: "title",
                title: "Aadhaar Number",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title: "Enter your 12 Digit Aadhaar Card number",
                styling: { fontSize: 16 },
              },
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
                styling: { marginTop: "5%" },
              },
            ],
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              { type: "badge", text: "Step 2" },
              {
                type: "title",
                title: "Aadhaar OTP",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "Enter OTP you received on Aadhaar registered mobile number",
                styling: { fontSize: 16 },
              },
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
                styling: { marginTop: "5%" },
              },
            ],
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              { type: "badge", text: "Step 3" },
              {
                type: "title",
                title: "Confirm Identity",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "Confirm your Aadhaar details - Name, Date of birth & Address",
                styling: { fontSize: 16 },
              },
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
                styling: { marginTop: "5%" },
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Frequently Asked Questions",
        children: [
          {
            type: "collapsibleList",
            title: "Q: Why do I need to verify Aadhaar?",
            subtitle:
              "A: Digital aadhaar verification proves your identity and address",
          },
          {
            type: "collapsibleList",
            title: "Q: What is aadhaar OTP?",
            subtitle:
              "A: Aadhaar OTP is sent via UIDAI for authentication purposes.",
          },
          {
            type: "collapsibleList",
            title: "Q: I did not get any OTP for Aadhaar verification",
            subtitle:
              "A: Please ensure that you have access to the mobile number linked with your Aadhaar in order to get the OTP.",
          },
          {
            type: "collapsibleList",
            title: "Q: I don't know which mobile number is linked with Aadhaar",
            subtitle:
              "A: Follow this process:\nStep 1: Go to https://myaadhaar.uidai.gov.in/verifyAadhaar\nStep 2: Enter 12-digit Aadhaar number and captcha code \nStep 3: Click on ‘Proceed to Verify’ \nStep 4: Here you will see the last three digits of the linked mobile number.",
          },
          {
            type: "collapsibleList",
            title: "Q: Do I need to submit physical copy of my Aadhaar card?",
            subtitle:
              "A: No. Aadhaar verification is a completely paperless process.",
          },
        ],
      },
      {
        type: "footer",
      },
    ],
  },

  mandate_help: {
    screenTitle: "Help - Mandate Registration",
    data: [
      {
        type: "container",
        styling: { padding: "4%" },
        children: [
          {
            type: "twoColumn",
            widths: ["35%", "65%"],
            styling: { margin: 0 },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Mandata/Logo.png",
                styling: {
                  width: "100%",
                  flex: 1,
                  aspectRatio: 1.6,
                },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                  // backgroundColor: "black",
                },
                children: [
                  { type: "title", title: "Adding Repayment Method (Mandate)" },
                  {
                    type: "subtitle",
                    title: "Choose one of the methods to setup repayment.",
                  },
                ],
              },
            ],
          },
          {
            type: "button",
            title: "Add Mandate",
            variant: "filled",
            clickType: "navigation",
            styling: { marginVertical: "10%" },
          },
          {
            type: "video",

            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              {
                type: "badge",
                text: "OPTION 1",
              },
              {
                type: "title",
                title: "Debit Card",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "To complete Mandate with a debit card, provide your debit card details and OTP to authenticate your Mandate.",
                styling: { fontSize: 16 },
              },
            ],
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              { type: "badge", text: "OPTION 2" },
              {
                type: "title",
                title: "Net Banking",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "To complete Mandate with a debit card, provide your debit card details and OTP to authenticate your Mandate.",
                styling: { fontSize: 16 },
              },
            ],
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "5%",
            },
            children: [
              { type: "badge", text: "OPTION 3" },
              {
                type: "title",
                title: "Aadhaar Card",
                styling: { fontSize: 18, marginLeft: "10%" },
              },
            ],
          },
          {
            type: "container",
            styling: { paddingTop: 0 },
            children: [
              {
                type: "subtitle",
                title:
                  "To complete Mandate with a debit card, provide your debit card details and OTP to authenticate your Mandate.",
                styling: { fontSize: 16 },
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Frequently Asked Questions",
        children: [
          {
            type: "collapsibleList",
            title: "Q: Is it mandatory to add Repayment Method (Mandate)?",
            subtitle:
              "A: Yes. This is 100% secure and executed by an RBI approved entity.",
          },
          {
            type: "collapsibleList",
            title:
              "Q:  What happens in case of insufficient balance in the bank account for auto-debit?",
            subtitle:
              "A: The transaction will fail and may impose additional penalty charges.",
          },
          {
            type: "collapsibleList",
            title: "Q: What is the fastest way to register mandate?",
            subtitle: "A: Debit Card",
          },
          {
            type: "collapsibleList",
            title: "Q: How much time will Aadhaar Mandate take?",
            subtitle: "A: 4-5 Banking Days",
          },
        ],
      },
      {
        type: "footer",
      },
    ],
  },

  customer_support: {
    screenTitle: "Customer Support",
    data: [
      {
        type: "section",
        title: "Basic Questions",
        children: [
          {
            type: "collapsibleList",
            title: "Q: What is Unipe?",
            subtitle:
              "A: Unipe is an interest-free solution that allows them to withdraw their salary advance whenever they need it.",
          },
          {
            type: "collapsibleList",
            title: "Q: How can I get advance salary from Unipe?",
            subtitle:
              "A: To get advance salary, follow these 5 simple steps: \n- Download and login to the Unipe App \n- Complete KYC verification by entering your Aadhar, Pan & Bank details \n- Enter the amount you want to withdraw \n- Set up repayment metho \nWithdraw your advance salary \n",
          },
          {
            type: "collapsibleList",
            title:
              "Q: Does Unipe charge me any fees or interest on advance salary?",
            subtitle:
              "A: The Unipe EWA program is interest free. However, we do charge a very small processing fee at the time of disbursement. If the Advance salary is paid back on time, there is no separate interest charged.",
          },
          {
            type: "collapsibleList",
            title:
              "Q: If I take Rs.1000 today, when will I have to pay it back?",
            subtitle:
              "A: The advance amount taken will be automatically deducted from your salary at the time of payroll processing.",
          },
          {
            type: "collapsibleList",
            title: "Q: Is my data protected?",
            subtitle:
              "A: Your data is 100% encrypted and stored securely and only shared with third parties post your consent.",
          },
        ],
      },
      {
        type: "section",
        title: "Topics",
        children: [
          {
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],

            navigate: { type: "account", screen: "Profile" },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/KYC.png",
              },
              {
                type: "container",
                styling: { paddingLeft: "5%" },
                children: [
                  {
                    type: "title",
                    title: "kyc Verification",
                  },
                  {
                    type: "subtitle",
                    title: "All your kyc related queries at one place",
                  },
                ],
              },
              {
                type: "icon",
                iconName: "chevron-right",
                iconSize: 28,
                iconColor: COLORS.gray,
              },
            ],
          },
          {
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],

            navigate: { type: "account", screen: "Profile" },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/mandate.png",
              },
              {
                type: "container",
                styling: { paddingLeft: "5%" },

                children: [
                  {
                    type: "title",
                    title: "Mandate",
                  },
                  {
                    type: "subtitle",
                    title: "All your repayment related queries",
                  },
                ],
              },
              {
                type: "icon",
                iconName: "chevron-right",
                iconSize: 28,
                iconColor: COLORS.gray,
              },
            ],
          },
          {
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],

            navigate: { type: "account", screen: "Profile" },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/SalaryWithdrawal.png",
              },
              {
                type: "container",
                styling: { paddingLeft: "5%" },
                children: [
                  {
                    type: "title",
                    title: "Salary Withdrawal",
                  },
                  {
                    type: "subtitle",
                    title: "All your salary related questions",
                  },
                ],
              },
              {
                type: "icon",
                iconName: "chevron-right",
                iconSize: 28,
                iconColor: COLORS.gray,
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "General FAQs",
        children: [
          {
            type: "collapsibleList",
            title: "Q: What is Unipe?",
            subtitle:
              "A: Unipe is an interest-free solution that allows them to withdraw their salary advance whenever they need it.",
          },
          {
            type: "collapsibleList",
            title: "Q: How can I get advance salary from Unipe?",
            subtitle:
              "A: To get advance salary, follow these 5 simple steps: \n- Download and login to the Unipe App \n- Complete KYC verification by entering your Aadhar, Pan & Bank details \n- Enter the amount you want to withdraw \n- Set up repayment metho \nWithdraw your advance salary \n",
          },
          {
            type: "collapsibleList",
            title:
              "Q: Does Unipe charge me any fees or interest on advance salary?",
            subtitle:
              "A: The Unipe EWA program is interest free. However, we do charge a very small processing fee at the time of disbursement. If the Advance salary is paid back on time, there is no separate interest charged.",
          },
          {
            type: "collapsibleList",
            title:
              "Q: If I take Rs.1000 today, when will I have to pay it back?",
            subtitle:
              "A: The advance amount taken will be automatically deducted from your salary at the time of payroll processing.",
          },
          {
            type: "collapsibleList",
            title: "Q: Is my data protected?",
            subtitle:
              "A: Your data is 100% encrypted and stored securely and only shared with third parties post your consent.",
          },
        ],
      },
      {
        type: "footer",
      },
    ],
  },
  mini_placement: [
    {
      type: "overlay",
      visible: true,
      styling: {
        backgroundColor: "#377476",
      },
      children: [
        {
          type: "container",
          // widths: ["10%", "90%"],
          styling: { flexDirection: "row", alignItems: "center" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
              styling: { height: 32, width: 32 },
            },
            {
              type: "container",
              styling: { paddingLeft: "3%" },
              children: [
                {
                  type: "title",
                  title: "March Payslip is ready for download",
                  styling: { color: "#fff" },
                },
                {
                  type: "subtitle",
                  title: "Click here to see details",
                  styling: { flex: 0, color: "#fff" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  bottom_alert: [
    {
      type: "bottomAlert",
      visible: false,
      children: [
        {
          type: "container",
          styling: {
            // height: 300,
            // backgroundColor: "black",
          },
          children: [
            {
              type: "container",
              // styling: { backgroundColor: "black" },
              children: [
                {
                  type: "image",
                  url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
                },
              ],
            },
            {
              type: "button",
              title: "Verify Aadhaar",
              variant: "filled",
              clickType: "navigation",
              styling: { marginTop: "5%" },
            },
            {
              type: "button",
              title: "Verify Aadhaar",
              variant: "filled",
              clickType: "navigation",
              styling: { marginBottom: "5%" },
            },
          ],
        },
      ],
    },
  ],
  account: [
    {
      type: "container",
      children: [
        {
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
          secondColumnStyle: { flex: 1, paddingLeft: 15 },
          navigate: { type: "account", screen: "Profile" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/profile.png ",
            },
            {
              type: "container",
              styling: { paddingLeft: "5%" },
              children: [
                {
                  type: "title",
                  title: "Profile",
                },
                {
                  type: "subtitle",
                  title: "See & edit your profile details",
                },
              ],
            },
            {
              type: "icon",
              iconName: "chevron-right",
              iconSize: 28,
              iconColor: COLORS.gray,
            },
          ],
        },
        {
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
          secondColumnStyle: { flex: 1, paddingLeft: 15 },
          navigate: { type: "account", screen: "Profile" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/payslip.png ",
            },
            {
              type: "container",
              styling: { paddingLeft: "5%" },
              children: [
                {
                  type: "title",
                  title: "Pay Slips",
                },
                {
                  type: "subtitle",
                  title: "View and download payslips",
                },
              ],
            },
            {
              type: "icon",
              iconName: "chevron-right",
              iconSize: 28,
              iconColor: COLORS.gray,
            },
          ],
        },
        {
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
          secondColumnStyle: { flex: 1, paddingLeft: 15 },
          navigate: { type: "account", screen: "KYC" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/KYC.png ",
            },

            {
              type: "container",
              styling: { paddingLeft: "5%" },
              children: [
                {
                  type: "title",
                  title: "KYC",
                },
                {
                  type: "subtitle",
                  title: "All your KYC details in one place",
                },
              ],
            },
            {
              type: "icon",
              iconName: "chevron-right",
              iconSize: 28,
              iconColor: COLORS.gray,
            },
          ],
        },

        {
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
          secondColumnStyle: { flex: 1, paddingLeft: 15 },
          navigate: { type: "account", screen: "Profile" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Support.png ",
            },
            {
              type: "container",
              styling: { paddingLeft: "5%" },
              children: [
                {
                  type: "title",
                  title: "Customer Support",
                },
                {
                  type: "subtitle",
                  title: "Talk to our support team",
                },
              ],
            },
            {
              type: "icon",
              iconName: "chevron-right",
              iconSize: 28,
              iconColor: COLORS.gray,
            },
          ],
        },
        {
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
          secondColumnStyle: { flex: 1, paddingLeft: 15 },
          navigate: { type: "account", screen: "Profile" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Feedback.png",
            },
            {
              type: "container",
              styling: { paddingLeft: "5%" },
              children: [
                {
                  type: "title",
                  title: "Submit Feedback",
                },
                {
                  type: "subtitle",
                  title: "Let us know your experience with us",
                },
              ],
            },
            {
              type: "icon",
              iconName: "chevron-right",
              iconSize: 28,
              iconColor: COLORS.gray,
            },
          ],
        },

        {
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
          secondColumnStyle: { flex: 1, paddingLeft: 15 },
          navigate: { type: "account", screen: "About Us" },
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/AboutUs.png",
            },
            {
              type: "container",
              styling: { paddingLeft: "5%" },
              children: [
                {
                  type: "title",
                  title: "About Us",
                },
                {
                  type: "subtitle",
                  title: "Read about us & our terms of use",
                },
              ],
            },
            {
              type: "icon",
              iconName: "chevron-right",
              iconSize: 28,
              iconColor: COLORS.gray,
            },
          ],
        },
      ],
    },

    // {
    //   type: "image",
    //   url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
    // },
  ],
  login_success: [
    {
      type: "container",
      styling: {
        // alignItems: "center",
        padding: "4%",
        backgroundColor: "#223240",
        height: "98%",
        justifyContent: "space-between",
      },

      children: [
        // {
        //   type: "container",
        //   styling: {
        //     flexDirection: "row",
        //     width: "100%",
        //     justifyContent: "flex-end",
        //   },
        //   children: [
        //     {
        //       type: "image",
        //       url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/AboutUs.png",
        //       styling: { height: 36 },
        //     },
        //   ],
        // },
        {
          type: "container",
          children: [
            {
              type: "title",
              title: "Congratulations on \n joining Unipe!",
              styling: { fontSize: 24, textAlign: "center", color: "#fff" },
            },
            {
              type: "subtitle",
              title:
                "Your employer, XXXXXXX has initiated \n your onboarding process.",
              styling: {
                fontSize: 18,
                textAlign: "center",
                flex: 0,
                color: "#fff",
                marginTop: "2%",
              },
            },
          ],
        },

        {
          type: "image",
          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/SplashScreens/AddRepaymentImage.png",
          styling: { aspectRatio: 1 },
        },
        {
          type: "card",
          gradientColors: [
            "rgba(110, 220, 133,0.3)",
            "rgba(237, 251, 139,0.3)",
          ],
          styling: { padding: "5%" },
          // widths: ["10%", "90%"],
          children: [
            {
              type: "icon",
              iconName: "information-outline",
              iconSize: 24,
              iconColor: "#fff",
            },
            {
              type: "container",
              styling: { paddingLeft: "4%" },
              children: [
                {
                  type: "subtitle",
                  styling: { color: "#ffffff", flex: 0, fontSize: 16 },
                  title:
                    "As per RBI guidelines, you have to complete e-KYC to get Advance Salary",
                },
              ],
            },
          ],
        },
        {
          type: "container",
          children: [
            {
              type: "button",
              title: "Start KYC",
              variant: "filled",
              clickType: "navigation",
              navigate: { type: "app", screen: "KycProgress" },
              styling: { marginVertical: 0 },
            },
            {
              type: "button",
              title: "I will do it later",
              clickType: "navigation",
              navigate: { type: "app", screen: "HomeStack" },
            },
          ],
        },
      ],
    },
  ],
  kyc_success: [
    {
      type: "container",
      styling: {
        // alignItems: "center",
        padding: "4%",
        backgroundColor: "#223240",
        height: "98%",
        justifyContent: "space-between",
      },

      children: [
        // {
        //   type: "container",
        //   styling: {
        //     flexDirection: "row",
        //     width: "100%",
        //     justifyContent: "flex-end",
        //   },
        //   children: [
        //     {
        //       type: "image",
        //       url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/AboutUs.png",
        //       styling: { height: 36 },
        //     },
        //   ],
        // },

        {
          type: "image",
          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/SplashScreens/AddRepaymentImage.png",
          styling: { aspectRatio: 1 },
        },
        {
          type: "container",
          children: [
            {
              type: "title",
              title: "KYC done Successfully",
              styling: { fontSize: 24, textAlign: "center", color: "#fff" },
            },
            {
              type: "subtitle",
              title: "As a last step please register your mandate information",
              styling: {
                fontSize: 18,
                textAlign: "center",
                flex: 0,
                color: "#fff",
                marginTop: "2%",
              },
            },
          ],
        },

        {
          type: "container",
          children: [
            {
              type: "button",
              title: "+ Add Repayment Method",
              variant: "filled",
              clickType: "navigation",
              navigate: {
                type: "app",
                stack: "EWAStack",
                screen: "EWA_MANDATE",
              },
              styling: { marginVertical: 0 },
            },
            {
              type: "button",
              title: "I will do it later",
              clickType: "navigation",
              navigate: { type: "app", screen: "HomeStack" },
            },
          ],
        },
      ],
    },
  ],
  notifications: [
    {
      type: "notification",
      title: "Notifications",
      children: [
        {
          type: "notification",
          title: "Hello",
          subtitle: "YOYO",
          notificationImageUri:
            "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
        },
        {
          type: "notification",
          title: "Hello",
          subtitle: "YOYO",
        },
      ],
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
          url: `cms`,
          params: { unipeEmployeeId, x: 1 },
        }),
        providesTags: ["getPersonalization"],
        transformResponse: (response) => {
          console.log("cms:", response);
          return response?.body;
        },
      }),
    }),
    overrideExisting: true,
  });

export const { useGetCmsQuery } = cmsApi;
