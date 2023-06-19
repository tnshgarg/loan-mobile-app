import { COLORS } from "../../constants/Theme";
import { api } from "./api";

const DUMMY_RES = {
  home: [
    // {
    //   type: "button",
    //   clickType: "navigation", // if linking, then url also
    //   navigate: { type: "app", stack: "EWAStack", screen: "Money" },
    //   children: [
    //     {
    //       title: "Continue",
    //       type: "outlined", // filled
    //       buttonColor: "#41be89",
    //       leftIcon: "file",
    //       rightIcon: "file",
    //       loading: false,
    //       containerStyle: {},
    //       titleStyle: {
    //         fontSize: 20,
    //         color: "#41be89",
    //       },
    //       iconColor: "#41be89",
    //     },
    //   ],
    // },
    {
      type: "banner",
      children: [
        {
          type: "image",
          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBanner.png",
          styling: {
            marginBottom: "-40%",
            marginTop: "-5%",
            alignSelf: "center",
          },
        },
        {
          type: "twoColumn",
          widths: ["46%", "46%"],
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
      gradientColors: [COLORS.white, COLORS.white],
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
      gradientColors: [COLORS.white, COLORS.white],
      leftIcon:
        "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
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
          widths: ["70%", "30%"],
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
  blog_1: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",

    data: [
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",
            // styling: { flexDirection: "row" },
            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
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
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
        ],
      },
    ],
  },
  blog_2: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",

    data: [
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",
            // styling: { flexDirection: "row" },
            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
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
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
        ],
      },
    ],
  },
  blog_3: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",

    data: [
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",
            // styling: { flexDirection: "row" },
            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
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
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
        ],
      },
    ],
  },
  blog_4: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",

    data: [
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",
            // styling: { flexDirection: "row" },
            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
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
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
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
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
          },
          {
            type: "container",
            // styling: { flexDirection: "row" },
            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
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
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
        ],
      },
    ],
  },
  blog_6: {
    screenTitle: "",
    headline: "What are the benefits of completing KYC?",
    headingImage:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",

    data: [
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",
            // styling: { flexDirection: "row" },
            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
              },
            ],
          },
        ],
      },
      {
        type: "twoColumn",
        widths: ["70%", "30%"],
        styling: { flexDirection: "row-reverse" },
        children: [
          {
            type: "image",
            styling: { width: "100%" },
            url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          },
          {
            type: "container",

            children: [
              { type: "title", title: "What is e-Mandate" },
              {
                type: "subtitle",
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salary",
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
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
          {
            type: "collapsibleList",
            title: "How to complete KYC Verification?",
            subtitle: "Search on the internet",
          },
        ],
      },
    ],
  },

  AadhaarHelp: {
    screenTitle: "Help - Aadhaar Verification",
    data: [
      {
        type: "container",
        styling: { flexDirection: "row" },
        children: [
          {
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/Logo.png",
            styling: {
              width: "60%",
              flex: 1,
              aspectRatio: 1.6,
            },
          },
          {
            type: "container",
            styling: {
              flex: 1,
              justifyContent: "center",
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
      },
      {
        type: "video",

        size: "large",
        thumbnail:
          "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
      },
      {
        type: "container",
        styling: { flexDirection: "row", alignItems: "center" },
        children: [
          { type: "badge", text: "Step 1", styling: { marginRight: 15 } },
          {
            type: "title",
            title: "Aadhaar Number",
            styling: { fontSize: 18 },
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
        styling: { flexDirection: "row", alignItems: "center" },
        children: [
          { type: "badge", text: "Step 2", styling: { marginRight: 15 } },
          {
            type: "title",
            title: "Aadhaar OTP",
            styling: { fontSize: 18 },
          },
        ],
      },
      {
        type: "container",
        styling: { paddingTop: 0 },
        children: [
          {
            type: "subtitle",
            title: "Enter OTP you received on Aadhaar registered mobile number",
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
        styling: { flexDirection: "row", alignItems: "center" },
        children: [
          { type: "badge", text: "Step 3", styling: { marginRight: 15 } },
          {
            type: "title",
            title: "Confirm Identity",
            styling: { fontSize: 18 },
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

  CustomerSupport: {
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
    ],
  },
  miniPlacement: [
    {
      type: "mini_placement",
      leftIcon:
        "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/learn.png",
      title: "March Payslip is ready for download",
      cta: "Click here to see details",
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
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/AboutUs.png ",
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
