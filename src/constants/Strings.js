import { COLORS } from "./Theme";

//00_login
export const LOGIN_TITLE = "Enter Mobile Number for Verification";
export const LOGIN_SUBTITLE =
  "This number will be used for all communication. You shall receive anSMS with code for verification. By continuing, you agree to our";
export const OTP_TITLE = "Please wait, we will auto verify the OTP \n sent to";
export const OTP_SUBTITLE =
  "Sit back & relax while we fetch the OTP & log you inside the Unipe App";
export const WELCOME_TITLE =
  "Let’s start onboarding process by verifying below documents.";

//Important URLs
export const TERMS_OF_SERVICE = "https://policies.google.com/terms?hl=en-US";
export const PRIVACY_POLICY = "https://policies.google.com/privacy?hl=en-US";

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
          gradientColors: [COLORS.white, COLORS.white],
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
          gradientColors: [COLORS.white, COLORS.white],
          styling: { padding: 0, marginTop: "10%" },
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
  login_success: [
    {
      type: "container",
      styling: { alignItems: "center" },
      children: [
        {
          type: "title",
          title: "Congratulations on \n joining Unipe!",
          styling: { fontSize: 24, textAlign: "center" },
        },
        {
          type: "subtitle",
          title:
            "Your employer, \n , XXXXXXX has initiated your onboarding process.",
          styling: { fontSize: 18, textAlign: "center", flex: 0 },
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
  language_list: [
    {
      localization_enabled: true,
      languages: [
        {
          type: "container",
          styling: {
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "white",
          },
          children: [
            {
              type: "title",
              title: "भाषा चुने / Choose language",
              styling: {
                fontSize: 18,
              },
            },
            {
              type: "container",
              styling: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 30,
                height: 165,
                width: "100%",
              },
              children: [
                {
                  type: "twoColumn",
                  widths: ["35%", "65%"],
                  onPress: {
                    type: "changeLanguage",
                    language: "en",
                  },
                  navigate: {
                    type: "app",
                    stack: "OnboardingStack",
                    screen: "Login",
                  },
                  styling: {
                    flexDirection: "row",
                    alignItems: "center",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#597E8D",
                    width: "60%",
                    height: 300,
                    borderRadius: 3,
                    padding: 10,
                    backgroundColor: "white",
                  },
                  children: [
                    {
                      type: "card",
                      gradientColors: ["#fff", "#fff"],
                      children: [
                        {
                          type: "image",
                          styling: {
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                          },
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/LanguageSelection/en.png",
                        },
                      ],
                    },
                    {
                      type: "card",
                      gradientColors: ["#fff", "#fff"],
                      styling: {
                        shadowOpacity: 0,
                      },
                      children: [
                        {
                          type: "title",
                          title: "English",
                          styling: {
                            fontSize: 18,
                            marginLeft: 10,
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "twoColumn",
                  widths: ["35%", "65%"],
                  onPress: {
                    type: "changeLanguage",
                    language: "hi",
                  },
                  navigate: {
                    type: "app",
                    stack: "OnboardingStack",
                    screen: "Login",
                  },
                  styling: {
                    flexDirection: "row",
                    alignItems: "center",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#597E8D",
                    width: "60%",
                    height: 300,
                    borderRadius: 3,
                    padding: 10,
                    backgroundColor: "white",
                  },
                  children: [
                    {
                      type: "card",
                      gradientColors: ["#fff", "#fff"],
                      children: [
                        {
                          type: "image",
                          styling: {
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                          },
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/LanguageSelection/hi.png",
                        },
                      ],
                    },
                    {
                      type: "card",
                      gradientColors: ["#fff", "#fff"],
                      styling: {
                        shadowOpacity: 0,
                      },
                      children: [
                        {
                          type: "title",
                          title: "Hindi",
                          styling: {
                            fontSize: 18,
                            marginLeft: 10,
                          },
                        },
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
  ],
  language_strings: {
    phoneVerificationSuccess: "आपका फ़ोन नंबर सफलतापूर्वक सत्यापित किया गया।",
    completeEkyc:
      "अगले चरण के रूप में कृपया अपने बैंक खाते में पैसा प्राप्त करने के लिए अपना ईकेवाईसी पूरा करें",
    startEkyc: "ईकेवाईसी शुरू करें",
    onboarding: "ऑनबोर्डिंग",
    tellUsAboutYou: "हमें अपने बारे में बताओ",
    incorrectFormat: "गलत स्वरूप",
    continue: "आगे बढ़े",
    whatsappPlaceholder: "आपका व्हाट्सएप मोबाइल नं.",
    motherNamePlaceholder: "मां का नाम*",
    maritalStatusPlaceholder: "वैवाहिक स्थिति का चयन करें*",
    educationPlaceholder: "शैक्षणिक योग्यता का चयन करें*",
    emailPlaceholder: "Your email ID",
    holdOnBack: "रुकिए! क्या आप वाकई वापस जाना चाहते हैं?",
    aadhaarNumber: "आधार नंबर",
    agreeKycTNC:
      "मैं अपनी पहचान वेरीफाई करने के लिए KYC पंजीकरण नियम और शर्तों से सहमत हूं। आपको अपने आधार पंजीकृत मोबाइल नंबर पर एक ओटीपी प्राप्त होगा।",
    invalidAadhaarNumber: "अमान्य आधार नंबर",
    enterAadhaarNumber: "अपना आधार नंबर दर्ज करें",
    wait10Minutes:
      "ओटीपी दोबारा भेजने के लिए आपको 10 मिनट तक इंतजार करना होगा।",
    holdOn: "रुकिए!",
    goBackEditAadhaar:
      "क्या आप वाकई वापस जाना चाहते हैं? अगर आप अपना आधार नंबर बदलना चाहते हैं तो जारी रखें।",
    verifyAadhaar: "आधार वेरीफाई करें",
    otpNotReceived: "क्या सुरक्षित कोड प्राप्त नहीं हुआ?",
    resendOtp: "फिर से ओटीपी भेजें",
    goBackAadhaarVerification:
      "अगर आप वापस जाते हैं तो आपका आधार वेरिफिकेशन दोबारा कराना होगा। यदि आप अपना आधार नंबर बदलना चाहते हैं तो ही जारी रखें।",
    areTheseAadhaarDetails: "क्या यह आपके आधार का विवरण हैं?",
    notMe: "नहीं",
    yesMe: "हाँ",
    enterPanNumber: "अपना PAN नंबर दर्ज करें",
    forgotPan: "PAN भूल गए?",
    agreeKycTNCPan:
      "मैं अपनी पहचान वेरीफाई करने के लिए KYC पंजीकरण नियम और शर्तों से सहमत हूं। नाम और जन्म तिथि वेरीफाई करने के लिए PAN आवश्यक है।",
    verifyAadhaarFirst: "कृपया पहले अपना आधार का वेरिफिकेशन करें",
    invalidPanNumber: "अमान्य PAN नंबर।",
    goBack: "क्या आप वापस जाना चाहते हैं?",
    goBackPanVerification:
      "यदि आप वापस जाते हैं तो आपका PAN वेरिफिकेशन फिर से करना होगा। अगर आप अपना PAN नंबर बदलना चाहते हैं तो जारी रखें।",
    areThesePanDetails: "क्या यह आपके PAN का विवरण हैं?",
    bankAccountDetails: "बैंक खाते का विवरण",
    referToPassbook:
      "अपने बैंक रिकॉर्ड में उल्लिखित सटीक नाम के लिए अपनी बैंक पासबुक या चेक बुक देखें",
    accountHolderName: "खाता धारक का नाम*",
    bankAccountNumber: "बैंक खाता संख्या*",
    refertoGetAccountNumber:
      "बैंक खाता संख्या प्राप्त करने के लिए अपनी बैंक पासबुक या चेक बुक देखें।",
    ifscCode: "IFSC कोड*",
    findIfscCode:
      "आप बैंक द्वारा प्रदान की गई चेक बुक या बैंक पासबुक पर IFSC कोड पा सकते हैं",
    upiId: "UPI आईडी",
    lotsOfUpiApps:
      "Google Pay, Phonepe, Amazon Pay, Paytm, BHIM, MobiKwik इत्यादि जैसे बहुत सारे UPI ऐप उपलब्ध हैं जहां से आप अपनी UPI आईडी प्राप्त कर सकते हैं।",
    agreeWithKycRegistration:
      "मैं अपनी पहचान वेरीफाई करने के लिए KYC पंजीकरण नियम और शर्तों से सहमत हूं। हम हर महीने आपकी एडवांस सैलरी जमा करने के लिए इस बैंक खाते/UPI आईडी का उपयोग करेंगे, कृपया अपने बैंक खाते का विवरण प्रदान करें।",
    detailsSafe: "आपकी सारी जानकारी हमारे पास सुरक्षित है",
    goBackBankVerification:
      "यदि आप वापस जाते हैं तो आपका बैंक वेरिफिकेशन फिर से करना होगा। अगर आप अपने बैंक खाते के विवरण में बदलाव करना चाहते हैं, तभी जारी रखें।",
    areTheseBankDetails: "क्या यह आपके बैंक खाते का विवरण है?",
    continuePanVerification: "PAN वेरिफिकेशन जारी रखें",
    continueBankVerification: "बैंक वेरिफिकेशन जारी रखें",
    bankName: "बैंक का नाम",
    branchName: "शाखा का नाम",
    branchCity: "शाखा शहर",
    ifscCodeSingle: "आईएफ़एससी",
    upi: "UPI",
    verifyStatus: "स्थिति की पुष्टि करें",
    editProfileDetails: "अपना प्रोफ़ाइल विवरण देखें और बदलाव करें",
    kycDetailsInOnePlace: "आपके सभी KYC विवरण एक ही स्थान पर",
    customerSupport: "ग्राहक सहायता",
    termsAndConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    talkToSupportTeam: "हमारी सहायता टीम से बात करें",
    readTermsOfUse: "Terms of use पढ़ें",
    readPrivacyPolicy: "हमारी Privacy Policy पढ़ें",
    logout: "लॉग आउट",
    logoutFromUnipe: "यूनीपे ऐप से लॉग आउट करें",
    choosePreferredMode: "कृपया अपना पसंदीदा तरीका चुनें",
    initializing: "प्रारंभ किया जा रहा है...",
    mandateRegistrationInProgress:
      "आपका मैंडेट पंजीकरण वर्तमान में प्रगति पर है।",
    MandateRequired:
      "देय तिथि पर ऋण भुगतान को ऑटो-डेबिट करने के लिए मैंडेट पंजीकरण आवश्यक है। यह 100% सुरक्षित है और RBI द्वारा अनुमोदित इकाई द्वारा किया जाता है",
    secured: "100% सुरक्षित",
    rbiApproved: "RBI स्वीकृत",
    updatingMandate: "मैंडेट पंजीकरण विवरण अद्यतन करना",
    mayTakeFewSeconds: "इसमें कुछ सेकंड लग सकते हैं",
    dontPressBack: "कृपया बैक बटन ना दबाएं",
    mandateFailed: "मैंडेट पंजीकरण विफल, कृपया पुन: प्रयास करें",
    employeeAddressDetailsRecorded: "कर्मचारी का पता दर्ज किया गया।",
    portal: "पोर्टल",
    familyDetails: "पारिवारिक विवरण",
    yourAddress: "आपका पता",
    nomineeAddress: "नामिती व्यक्ति का पता",
    nomineeAddressDetailsRecorded: "नामिती के पते का विवरण दर्ज किया गया।",
    esicPortalDetailsRecorded: "ESIC पोर्टल विवरण दर्ज किया गया।",
    fatherName: "पिता/पति का नाम*",
    relationWithEmployee: "कर्मचारी (पिता/पति) के साथ संबंध*",
    nameOfNominee: "नॉमिनी का नाम (आधार कार्ड के अनुसार)*",
    nomineeRelationship: "कर्मचारी के साथ नामिती व्यक्ति का संबंध*",
    documents: "दस्तावेज़",
    moreDetailsComingSoon: "अधिक जानकारी जल्द आ रही है",
    dateOfBirth: "लाइसेंस में दर्ज जन्म तिथि",
    licenseNeeded:
      "भारी मशीनरी संचालित करने के लिए अपनी पात्रता को वेरीफाई करने के लिए लाइसेंस की आवश्यकता होती है।",
    expiryDate: "एक्सपायरी डेट",
    nonTransport: "गैर-परिवहन",
    valid: "वैध",
    invalid: "अमान्य",
    licenseDetailsNotEditable:
      "The License Details are not editable, please ask your employer to update",
    unipeP2PHeading:
      "Unipe Invest is a P2P investment that earns you upto 9% interest on your investments",
    poweredByLiquiloans:
      "We are powered by Liquiloans, RBI regulated P2P NBFC.",
    interestEarned:
      "Interest earned will be earned daily and you are free to withdraw your investment and earnings at any time",
    welcomeToUnipeInvest: "Welcome to Unipe Invest.",
    designedToMultiply: "Designed to multiply your growth",
    knowMore: "Know more",
    youAreOnly: "You are only",
    steps: "2 steps",
    awayFromMakingInvestment: "away from making your first investment",
    proceedToVerifyAndGrowWealth:
      "proceed to verify your details and start growing your wealth.",
    howItWorks: "How it works?",
    joinedWaitlist: "You've joined the waitlist for Unipe Invest!!",
    rbiRegisteredNBFC: "an RBI registered NBFC-P2P",
    p2pInvestment: "What is P2P investment?",
    peerToPeerInvestment:
      "Peer 2 Peer investment allows you to invest money against loans given to borrows and is done by our RBI regulated partner",
    benefitsOfP2P: "What are the benefits of P2P investment?",
    p2pLendingRBI:
      "P2P lending is regulated by RBI. We have partnered with Liquiloans to offer investment products\n\nP2P investment gives opportunity to earn more than traditional deposit products",
    risksOfP2P: "What are the risks associated with P2P investment?",
    p2pRisks:
      "Like any other investment product P2P investment also has associated risk like performance of loans and repayment of borrowers affect your returns\n\nGood News is Our partner has honoured 100% withdrawal within 48 Hrs.\n\nAlso our partner investment product is rated as AA- (by CRISIL) which is one of the highest in the industry",
    whyInvestWithUnipe: "Why invest with Unipe?",
    earnHighReturns:
      "You can earn inflation beating highest returns for your investment\n\nYour principal and base interest is secured at our RBI regulated partner",
    knowMoreAboutP2P: "Know more about P2P investment",
    howMuch: "आप कितनी राशि निकालना चाहते हैं?",
    accessOfEF: "यह रही आपकी आपातकालीन राशि",
    zeroInterest: "शून्य ब्याज शुल्क, नाममात्र की प्रोसेसिंग फीस",
    iAgree: "मैं नियमों और शर्तों से",
    TermsAndConditions: "सहमत हूं",
    processing: "प्रोसेसिंग",
    areTheseKycDetails: "क्या यह आपके KYC का विवरण हैं?",
    processingFees: "प्रोसेसिंग फीस †",
    disAmount: "भुगतान राशि*",
    loanAmount: "ऋण की राशि",
    dueDate: "नियत तारीख",
    loanDetails: "ऋण विवरण",
    bankDetails: "बैंक विवरण",
    moneyWillBeAutoDebited:
      "*राशि या तो आपके खाते से स्वतः डेबिट हो जायेगी या आपकी कंपनी द्वारा आपके आगामी वेतन से काट ली जाएगी।",
    personalDetails: "व्यक्तिगत विवरण",
    aboveDetails: "मैं उपरोक्त विवरण की पुष्टि करता हूं और इससे सहमत हूं",
    apr: "† सालाना प्रतिशत दर @",
    congrats: "बधाई हो",
    advanceSalaryCredited:
      "आपकी एडवांस सैलरी आपके बैंक खाते में जमा करा दी गई है।",
    sorry: "माफ़ कीजिये",
    cannotProcessSalary: "हम इस समय आपके अग्रिम वेतन को प्रोसेस नहीं कर सकते।",
    pending: "पेंडिंग",
    receiveMoney: "आपको अगले 24 बैंकिंग घंटों में राशि प्राप्त होगी।",
    netTransferAmount: "नेट ट्रांसफर राशि",
    loanAccountNumber: "ऋण खाता संख्या",
    transferStatus: "ट्रांसफर की स्थिति",
    moneyAutoDebitedUpcomingSalary:
      "आपके आने वाले वेतन से राशि स्वतः डेबिट हो जाएगी",
    onDemandSalary: "यह रही आपकी ऑन-डिमांड सैलरी",
    totalAmountDue: "आपकी कुल बकाया राशि",
    RepaymentDue: "आपका पुनर्भुगतान <> दिनों से बकाया है",
    pastDraws: "आपके पिछले विथड्रॉवल्स",
    getYourSalaryToday: "आज ही अपना वेतन प्राप्त करें!",
  },
};
