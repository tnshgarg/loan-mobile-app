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
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
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
              { type: "badge", text: "Step 1" },
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
            title: "Q: How much time will KYC Process take?",
            subtitle: "A: KYC happens instantly with government APIs.",
          },
          {
            type: "collapsibleList",
            title: "Q: What happens if I don't complete my minimum KYC?",
            subtitle: "A: You won't be able to withdraw your advance salary.",
          },
        ],
      },
      { type: "footer" },
    ],
  },
  aadhaar_help: {
    data: [
      {
        children: [
          {
            children: [
              {
                styling: {
                  aspectRatio: 1.6,
                  flex: 1,
                  width: "100%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/Logo.png",
              },
              {
                children: [
                  {
                    title: "How to verify Aadhaar?",
                    type: "title",
                  },
                  {
                    title: "Follow this 3-step process",
                    type: "subtitle",
                  },
                ],
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                type: "container",
              },
            ],
            styling: {
              margin: 0,
            },
            type: "twoColumn",
            widths: ["35%", "65%"],
          },
          {
            clickType: "navigation",
            styling: {
              marginVertical: "10%",
            },
            title: "Verify Aadhaar",
            type: "button",
            variant: "filled",
          },
          {
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
            type: "video",
          },

          {
            children: [
              {
                text: "Step 1",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Aadhaar Number",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title: "Enter your 12 Digit Aadhaar Card number",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "Step 2",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Aadhaar OTP",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },

          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "Enter OTP you received on Aadhaar registered mobile number",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "Step 3",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Confirm Identity",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "Confirm your Aadhaar details - Name, Date of birth & Address",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
        ],
        styling: {
          padding: "4%",
        },
        type: "container",
      },
      {
        children: [
          {
            subtitle:
              "A: Digital aadhaar verification proves your identity and address",
            title: "Q: Why do I need to verify Aadhaar?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A: Aadhaar OTP is sent via UIDAI for authentication purposes.",
            title: "Q: What is aadhaar OTP?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A: Please ensure that you have access to the mobile number linked with your Aadhaar in order to get the OTP.",
            title: "Q: I did not get any OTP for Aadhaar verification",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A: Follow this process:\nStep 1: Go to https://myaadhaar.uidai.gov.in/verifyAadhaar\nStep 2: Enter 12-digit Aadhaar number and captcha code \nStep 3: Click on 'Proceed to Verify' \nStep 4: Here you will see the last three digits of the linked mobile number.",
            title: "Q: I don't know which mobile number is linked with Aadhaar",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A: No. Aadhaar verification is a completely paperless process.",
            title: "Q: Do I need to submit physical copy of my Aadhaar card?",
            type: "collapsibleList",
          },
        ],
        title: "Frequently Asked Questions",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Help - Aadhaar Verification",
  },
  pan_help: {
    data: [
      {
        children: [
          {
            children: [
              {
                styling: {
                  aspectRatio: 1.6,
                  flex: 1,
                  width: "100%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/PAN/Logo.png",
              },
              {
                children: [
                  {
                    title: "How to verify PAN Card?",
                    type: "title",
                  },
                  {
                    title: "Follow this 2-step process",
                    type: "subtitle",
                  },
                ],
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                type: "container",
              },
            ],
            styling: {
              margin: 0,
            },
            type: "twoColumn",
            widths: ["35%", "65%"],
          },
          {
            clickType: "navigation",
            styling: {
              marginVertical: "10%",
            },
            title: "Verify PAN  >",
            type: "button",
            variant: "filled",
          },
          {
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
            type: "video",
          },

          {
            children: [
              {
                text: "Step 1",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Pan Number",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title: "Enter your PAN Card number (Permanent Account Number)",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "Step 2",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Confirm Details",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },

          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "Confirm your PAN details - Name, Father's Name & Date of birth",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
        ],
        styling: {
          padding: "4%",
        },
        type: "container",
      },
      {
        children: [
          {
            subtitle:
              "A. PAN card verification proves your income and identity",
            title: "Q. Why do I need to verify my PAN Card?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. No. PAN verification is a completely paperless process.",
            title: "Q. Do I need to submit physical copy of my PAN card",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. You can make an instant e-PAN card absolutely free (within 5 minutes) on the website of Income Tax Department.",
            title: "Q. I don't have a Pan Card, what should I do?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. You can find your PAN Card number in any of the following ways:\n\nOption 1: Income Tax Website\nHead over to https://www.incometaxindiaefiling.gov.in/\nClick on “Know Your PAN” under section “Quick Links” \nEnter the details - including name, date of birth & mobile number \nEnter the OTP you received on the mobile number and click on “Validate” \nNow enter your Father’s name and click on the “Submit” button \n\nOption 2: Salary Slip\n Check your payslip to find your PAN number. It should be mentioned on the payslip if you receive regular salary payments from your employer. If you can't find it, contact your HR or finance department for assistance. \n\nOption 3: Form-16\nPAN numbers are mentioned in the Form 16 given to you by your employer. Most organisations mail the form 16 to their employees and/or upload the same to an internal portal. Have more questions? Read all FAQs.",
            title: "Q. I don't remember my Pan Card number, what should I do?",
            type: "collapsibleList",
          },
        ],
        title: "Frequently Asked Questions",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Help - PAN Card Verification",
  },
  bank_help: {
    data: [
      {
        children: [
          {
            children: [
              {
                styling: {
                  aspectRatio: 1.6,
                  flex: 1,
                  width: "100%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/Logo.png",
              },
              {
                children: [
                  {
                    title: "How to Add Bank Account?",
                    type: "title",
                  },
                  {
                    title: "Follow this 2-step process",
                    type: "subtitle",
                  },
                ],
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                type: "container",
              },
            ],
            styling: {
              margin: 0,
            },
            type: "twoColumn",
            widths: ["35%", "65%"],
          },
          {
            clickType: "navigation",
            styling: {
              marginVertical: "10%",
            },
            title: "Verify Bank Account",
            type: "button",
            variant: "filled",
          },
          {
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
            type: "video",
          },
          {
            children: [
              {
                text: "Step 1",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Bank Account Details",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "Provide your Account Holder's Name, Account Number, IFSC Code",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "Step 2",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Confirm Bank Account",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "Confirm your Account details - Name, Account Number & IFSC",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
        ],
        styling: {
          padding: "4%",
        },
        type: "container",
      },
      {
        children: [
          {
            subtitle:
              "A. Your advance salary money will be deposited in this account",
            title: "Q. Why do I need to add Bank Account?",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Yes. You need to provide your own Bank Account.",
            title: "Q. Is it mandatory to add my own Account?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. No. Bank Account addition is a completely paperless process.",
            title: "Q. Do I need to submit physical document of Bank Account?",
            type: "collapsibleList",
          },
        ],
        title: "Frequently Asked Questions",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Help - Bank Verification",
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
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                children: [
                  {
                    type: "title",
                    title: "Adding Repayment Method (Mandate)",
                  },
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
              { type: "badge", text: "OPTION 1" },
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
      { type: "footer" },
    ],
  },
  account_navigation_list: [
    {
      children: [
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/profile.png ",
            },
            {
              children: [
                {
                  title: "Profile",
                  type: "title",
                },
                {
                  title: "See & edit your profile details",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "Profile",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/payslip.png ",
            },
            {
              children: [
                {
                  title: "Pay Slips",
                  type: "title",
                },
                {
                  title: "View and download payslips",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "Profile",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/KYC.png ",
            },
            {
              children: [
                {
                  title: "KYC",
                  type: "title",
                },
                {
                  title: "All your KYC details in one place",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "KYC",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Support.png ",
            },
            {
              children: [
                {
                  title: "Customer Support",
                  type: "title",
                },
                {
                  title: "Talk to our support team",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            params: { blogKey: "customer_support" },
            type: "cms",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Support.png ",
            },
            {
              children: [
                {
                  title: "App Language",
                  type: "title",
                },
                {
                  title: "Choose your preferred language",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            stack: "AccountStack",
            screen: "Language",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Feedback.png",
            },
            {
              children: [
                {
                  title: "Submit Feedback",
                  type: "title",
                },
                {
                  title: "Let us know your experience with us",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "Profile",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/AboutUs.png ",
            },
            {
              children: [
                {
                  title: "About Us",
                  type: "title",
                },
                {
                  title: "Read about us & our terms of use",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            type: "app",
            stack: "AccountStack",
            screen: "TabsScreen",
            params: { key: "about_us" },
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
      ],
      type: "container",
    },
  ],
  blog_1: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            children: [
              {
                title: "What is KYC?",
                type: "title",
              },
              {
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salrary.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            children: [
              {
                title: "Why Complete KYC?",
                type: "title",
              },
              {
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            children: [
              {
                title: "Risks of Incomplete KYC",
                type: "title",
              },
              {
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            children: [
              {
                title: "Unlock Advance with KYC",
                type: "title",
              },
              {
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            children: [
              {
                title: "Advance without KYC",
                type: "title",
              },
              {
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
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
            title: "Q: How much time will KYC Process take?",
            subtitle: "A: KYC happens instantly with government APIs.",
          },
          {
            type: "collapsibleList",
            title: "Q: What happens if I don't complete my minimum KYC?",
            subtitle: "A: You won't be able to withdraw your advance salary.",
          },
        ],
        title: "FAQs",
        type: "section",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
    headline: "What are the benefits of completing KYC?",
    screenTitle: "",
  },
  blog_2: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            children: [
              {
                title: "What is KYC?",
                type: "title",
              },
              {
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salrary.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            children: [
              {
                title: "Why Complete KYC?",
                type: "title",
              },
              {
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            children: [
              {
                title: "Risks of Incomplete KYC",
                type: "title",
              },
              {
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            children: [
              {
                title: "Unlock Advance with KYC",
                type: "title",
              },
              {
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            children: [
              {
                title: "Advance without KYC",
                type: "title",
              },
              {
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            subtitle: "A. Search on the internet",
            title: "Q. How to complete KYC Verification?",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I don't have PAN Card",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I have not received my advance salary",
            type: "collapsibleList",
          },
        ],
        title: "FAQs",
        type: "section",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
    headline: "What are the benefits of completing KYC?",
    screenTitle: "",
  },
  blog_3: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            aspectRatio: 0.88,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/WhatMandate.png",
          },
          {
            children: [
              {
                title: "What is e-Mandate ?",
                type: "title",
              },
              {
                title:
                  "e-Mandate is a simple one-time registration process that enables automatic repayments of the advance salary amount.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            aspectRatio: 0.88,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/OneTimeProc.png",
          },
          {
            children: [
              {
                title: "One-Time Process",
                type: "title",
              },
              {
                title:
                  "With e-Mandate registration, you only have to register once to fulfill all your future advance salary requirements.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            aspectRatio: 0.88,
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/SaveMoney.png",
          },
          {
            children: [
              {
                title: "Save Money with Auto Repayments",
                type: "title",
              },
              {
                title:
                  "e-Mandate registration ensures automatic deduction of repayment amount, avoiding interest charges due to delayed repayments.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            aspectRatio: 0.78,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/AvoidLateFine.png",
          },
          {
            children: [
              {
                title: "Avoid Late Fine",
                type: "title",
              },
              {
                title:
                  "Timely repayment of the advance salary amount through e-Mandate registration ensures that employees are safe from any late fine that may be charged in case of delayed repayment.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
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
        title: "FAQs",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
    headline: "What are the benefits of Mandate Registration?",
    screenTitle: "",
  },
  blog_4: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            children: [
              {
                title: "What is KYC?",
                type: "title",
              },
              {
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salrary.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            children: [
              {
                title: "Why Complete KYC?",
                type: "title",
              },
              {
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            children: [
              {
                title: "Risks of Incomplete KYC",
                type: "title",
              },
              {
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            children: [
              {
                title: "Unlock Advance with KYC",
                type: "title",
              },
              {
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            children: [
              {
                title: "Advance without KYC",
                type: "title",
              },
              {
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            subtitle: "A. Search on the internet",
            title: "Q. How to complete KYC Verification?",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I don't have PAN Card",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I have not received my advance salary",
            type: "collapsibleList",
          },
        ],
        title: "FAQs",
        type: "section",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
    headline: "What are the benefits of completing KYC?",
    screenTitle: "",
  },
  blog_5: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/What.png",
          },
          {
            children: [
              {
                title: "What is Advance Salary?",
                type: "title",
              },
              {
                title:
                  "Advance salary option provides employees with the ability to access their earned salary before the end of the month.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            aspectRatio: 0.8,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/zeroInterest.png",
          },
          {
            children: [
              {
                title: "Zero Interest Advance Salary",
                type: "title",
              },
              {
                title:
                  "With advance salary, you can get paid early without any interest charges, giving you instant access to your earned salary.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/JoiningFees.png",
          },
          {
            children: [
              {
                title: "No Joining Fees",
                type: "title",
              },
              {
                title:
                  "Completing your full KYC process is the only requirement to withdraw your advance salary without any joining fees.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            aspectRatio: 0.92,
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/AvoidLoans.png",
          },
          {
            children: [
              {
                title: "Avoid High-Interest Loans",
                type: "title",
              },
              {
                title:
                  "By utilizing advance salary, you can avoid taking high-interest loans when you are in need of immediate cash, providing financial security.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            title: "Ready to get your advance salary money?",
            type: "title",
          },
          {
            type: "button",
            variant: "filled",
            title: "Get Money",
            clickType: "navigation",
            navigate: {
              type: "app",
              stack: "HomeStack",
              screen: "Money",
            },
          },
        ],
        styling: { paddingLeft: "10%", paddingRight: "10%" },
        type: "container",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
    headline: "What are the benefits of Advance Salary?",
    screenTitle: "",
  },
  blog_6: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/PF/What.png",
          },
          {
            children: [
              {
                title: "What is PF Balance?",
                type: "title",
              },
              {
                title:
                  "PF Balance is the amount that has been accumulated in your Provident Fund account. It is your savings for your retirement years.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            children: [
              {
                content:
                  "### Four Ways to Check your PF Balance\n#### 1. Online through the EPFO portal\nFollow these simple steps to check your PF Balance through the EPFO portal:  \n  \n- Visit the [EPFO portal](https://www.epfindia.gov.in/site_en/index.php)  \n- Click on the ‘For Employees’ tab and select ‘Our Services’  \n- Click on ‘Member Passbook’  \n- Enter your UAN (Universal Account Number) and password  \n- Click on ‘Login’ and view your PF Balance\n\n####  2. Through the UMANG App\nTo check your PF Balance through the UMANG App, follow these steps:  \n  \n- Download the UMANG App from Google Playstore or the App Store  \n- Register on the app using your mobile number  \n- Click on the ‘EPFO’ option and select ‘Employee Centric Services’  \n- Enter your UAN and OTP to log in  \n- View your PF Balance\n\n####  3. Via Missed Call Service\nTo check your PF Balance through the Missed Call service, follow these steps:  \n  \n- Ensure that your UAN is linked to your Aadhaar and bank account  \n- Give a missed call to the number [011-22901406](tel:+911122901406) from your registered mobile number  \n- Receive an SMS with your PF Balance  \n  \n####  4. By Sending an SMS  \nTo check your PF Balance by sending an SMS, follow these steps:  \n- Ensure that your UAN is linked to your Aadhaar and bank account  \n- Send an SMS to the number 7738299899 with the message EPFOHO UAN ENG  \n- Receive an SMS with your PF Balance",
                type: "markdown",
              },
            ],
            styling: {
              padding: "5%",
            },
            type: "card",
          },
        ],
        styling: {
          padding: "5%",
        },
        type: "container",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
    headline: "How do I check my PF Balance?",
    screenTitle: "",
  },
  blogs: {
    data: [
      {
        type: "container",
        styling: { padding: "4%" },
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "What are the benefits of completing KYC?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_1" },
              type: "cms",
            },
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "Why Unipe?",
                        type: "title",
                      },
                      {
                        title:
                          "Lorem Ipsum is simply dumm typesetting industry.",
                        type: "subtitle",
                      },
                      {
                        iconName: "video-outline",
                        title: "3 min video",
                        type: "iconText",
                      },
                    ],
                    type: "container",
                  },
                  {
                    thumbnail:
                      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                    type: "video",
                    size: "small",
                    videoUri: "ux6XLNiEpLs",
                  },
                ],
                type: "twoColumn",
              },
            ],
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "What are the benefits of Mandate Registration?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_3" },
              type: "cms",
            },
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "How Unipe Works?",
                        type: "title",
                      },
                      {
                        title:
                          "Lorem Ipsum is simply dumm typesetting industry.",
                        type: "subtitle",
                      },
                      {
                        iconName: "video-outline",
                        title: "3 min video",
                        type: "iconText",
                      },
                    ],
                    type: "container",
                  },
                  {
                    thumbnail:
                      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                    type: "video",
                    size: "small",
                    videoUri: "ux6XLNiEpLs",
                  },
                ],
                type: "twoColumn",
              },
            ],
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "What are the benefits of Advance Salary?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_5" },
              type: "cms",
            },
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "How do I check my PF Balance?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_6" },
              type: "cms",
            },
            type: "card",
          },
        ],
      },
    ],
    headingImage: "",
    headline: "",
    screenTitle: "Learn With Us",
  },
  customer_support: {
    data: [
      {
        children: [
          {
            title: "Q: How to complete KYC verification?",
            navigate: { type: "cmsScreenTwo", params: { blogKey: "kyc_help" } },

            type: "collapsibleList",
          },
          {
            navigate: { type: "cmsScreenTwo", params: { blogKey: "pan_info" } },
            title: "Q. I don't have a Pan Card, what should I do?",
            type: "collapsibleList",
          },
          {
            navigate: {
              type: "cmsScreenTwo",
              params: { blogKey: "salary_info" },
            },
            title: "Q. Why was my advance salary request rejected?",
            type: "collapsibleList",
          },
        ],
        title: "Most Asked Questions",
        type: "section",
      },
      {
        children: [
          {
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/KYC.png",
              },
              {
                children: [
                  {
                    title: "kyc Verification",
                    type: "title",
                  },
                  {
                    title: "All your kyc related queries at one place",
                    type: "subtitle",
                  },
                ],
                styling: {
                  paddingLeft: "5%",
                },
                type: "container",
              },
              {
                iconColor: "#5E8290",
                iconName: "chevron-right",
                iconSize: 28,
                type: "icon",
              },
            ],
            navigate: {
              params: { blogKey: "kyc_help" },
              type: "cmsScreenTwo",
            },
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],
          },
          {
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/mandate.png",
              },
              {
                children: [
                  {
                    title: "Mandate",
                    type: "title",
                  },
                  {
                    title: "All your repayment related queries",
                    type: "subtitle",
                  },
                ],
                styling: {
                  paddingLeft: "5%",
                },
                type: "container",
              },
              {
                iconColor: "#5E8290",
                iconName: "chevron-right",
                iconSize: 28,
                type: "icon",
              },
            ],
            navigate: {
              params: { blogKey: "mandate_help" },
              type: "cmsScreenTwo",
            },
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],
          },
          {
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/SalaryWithdrawal.png",
              },
              {
                children: [
                  {
                    title: "Salary Withdrawal",
                    type: "title",
                  },
                  {
                    title: "All your salary related questions",
                    type: "subtitle",
                  },
                ],
                styling: {
                  paddingLeft: "5%",
                },
                type: "container",
              },
              {
                iconColor: "#5E8290",
                iconName: "chevron-right",
                iconSize: 28,
                type: "icon",
              },
            ],
            navigate: {
              screen: "Profile",
              type: "account",
            },
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],
          },
        ],
        title: "Topics",
        type: "section",
      },
      {
        children: [
          {
            subtitle:
              "A. On-Demand Salary or Earned Wage Access is a service that allows employees to access a portion of their earned but unpaid salary before the regular payday. It provides financial flexibility by enabling employees to withdraw a portion of their salary on-demand.",
            title: "Q. What is On-Demand Salary or Earned Wage Access?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. You can withdraw a portion of your earned salary, typically based on your attendance or work hours. The advance amount will be automatically deducted from your salary during the payroll process.",
            title: "Q. How does On-Demand Salary or Earned Wage work?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. No, with On-Demand Salary or Earned Wage Access, employees can only withdraw a portion of their earned salary. The amount available for withdrawal is typically less than the total monthly salary.",
            title: "Q. Can an employee withdraw more than the earned salary?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. Unipe's On-Demand Salary feature is interest-free. However, there may be a small processing fee charged at the time of disbursement. If you repay the advance salary on time, there will be no separate interest charged.",
            title: "Q. Does Unipe charge me any fees or interest on the loans?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. You will receive the requested on demand salary in 24 banking hours.",
            title: "Q. How quickly will I get the loan?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. The advance amount taken will be automatically deducted from your salary at the time of payroll processing.",
            title:
              "Q. If I take Rs.1000 today, when will I have to pay it back?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "A. Yes, employees can make multiple withdrawals within a month using the On-Demand Salary feature. However, the total amount of withdrawal will be limited to the portion of the earned salary available for withdrawal based on the company's policies.",
            title: "Q. Can an employee make multiple withdrawals?",
            type: "collapsibleList",
          },
        ],
        title: "General FAQs",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Customer Support",
  },
  home: [
    {
      children: [
        {
          children: [
            {
              styling: {
                alignSelf: "center",
                marginBottom: "-40%",
                marginTop: "-20%",
              },
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBanner.png",
            },
            {
              children: [
                {
                  children: [
                    {
                      type: "image",
                      url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBannerCurrentContest.png",
                    },
                  ],
                  type: "card",
                },
                {
                  children: [
                    {
                      type: "image",
                      url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBannerLastMonthWinners.png",
                    },
                  ],
                  gradientColors: ["#fff", "#fff"],
                  type: "card",
                },
              ],
              styling: {
                border: "1px solid black",
              },
              type: "twoColumn",
              widths: ["48%", "48%"],
            },
          ],
          type: "banner",
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title: "What are the benefits of completing KYC?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_1" },
                    type: "cms",
                  },
                  type: "card",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title:
                                "What are the benefits of Mandate Registration?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_3" },
                    type: "cms",
                  },
                  type: "card",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title: "What are the benefits of Advance Salary?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_5" },
                    type: "cms",
                  },
                  type: "card",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title: "How do I check my PF Balance?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_6" },
                    type: "cms",
                  },
                  type: "card",
                },
              ],
              type: "swiper",
            },
          ],
          ctaRoute: "LearnWithUs",
          ctaText: "SEE ALL",
          gradientColors: ["#FFFFFF", "#FFFFFF"],
          leftIcon:
            "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsIcon.png",
          styling: {
            marginTop: "10%",
            padding: 0,
          },
          title: "Learn With Us",
          type: "section",
          navigate: {
            type: "cms",
            params: {
              blogKey: "blogs",
            },
          },
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      title: "Why Unipe?",
                      type: "title",
                    },
                    {
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
                      type: "subtitle",
                    },
                  ],
                  styling: {
                    marginLeft: "5%",
                  },
                  type: "container",
                },
                {
                  size: "small",
                  thumbnail:
                    "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                  type: "video",
                  videoUri: "ux6XLNiEpLs",
                },
              ],
              styling: {
                flexDirection: "row-reverse",
              },
              type: "twoColumn",
            },
          ],
          gradientColors: ["#F2F8F9", "#F2F8F9"],
          type: "card",
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      title: "How Unipe Works?",
                      type: "title",
                    },
                    {
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
                      type: "subtitle",
                    },
                  ],
                  styling: {
                    marginLeft: "5%",
                  },
                  type: "container",
                },
                {
                  size: "small",
                  thumbnail:
                    "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                  type: "video",
                  videoUri: "ux6XLNiEpLs",
                },
              ],
              styling: {
                flexDirection: "row-reverse",
              },
              type: "twoColumn",
            },
          ],
          gradientColors: ["#F2F8F9", "#F2F8F9"],
          type: "card",
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
                    '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500."',
                },
                {
                  type: "twoColumn",
                  widths: ["11%", "89%"],
                  styling: { margin: 0, marginTop: "3%" },
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
                    '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500."',
                },
                {
                  type: "twoColumn",
                  widths: ["11%", "89%"],
                  styling: { margin: 0, marginTop: "3%" },
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
      styling: {
        padding: "4%",
      },
      type: "container",
    },
    {
      type: "footer",
    },
  ],
  login_success: {
    screenTitle: "",
    data: [
      {
        type: "container",
        styling: {
          padding: "4%",
          backgroundColor: "#223240",
          height: "100%",
          justifyContent: "space-between",
        },
        children: [
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
  },
  kyc_success: [
    {
      type: "container",
      styling: {
        padding: "4%",
        backgroundColor: "#223240",
        height: "98%",
        justifyContent: "space-between",
      },
      children: [
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
  mini_placement: [
    {
      type: "overlay",
      visible: true,
      styling: { backgroundColor: "#377476" },
      children: [
        {
          type: "container",
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
  notifications: {
    data: [],
    screenTitle: "Notifications",
  },
  bottom_alert: [
    {
      type: "bottomAlert",
      visible: true,
      children: [
        {
          type: "container",
          styling: {},
          children: [
            {
              type: "container",
              children: [
                {
                  type: "image",
                  url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/SplashScreens/Sorry.png",
                  styling: { marginBottom: "10%" },
                },
                { type: "title", title: "App Update Available" },
                {
                  type: "subtitle",
                  title:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                  styling: { flex: 0 },
                },
              ],
            },
            {
              type: "button",
              title: "Update Now",
              variant: "filled",
              clickType: "navigation",
              styling: { marginTop: "5%" },
            },
          ],
        },
      ],
    },
  ],
  about_us: [
    {
      type: "tab",
      title: "About Us",
      key: "AboutUs",
      children: [
        { type: "title", title: "About Us" },
        {
          type: "markdown",
          content:
            "Sint voluptate ad irure esse et anim officia elit culpa nulla laborum sint. Veniam commodo ad esse officia enim sit esse ad veniam aliqua non. In laborum magna exercitation sunt. Enim pariatur et exercitation ipsum exercitation reprehenderit.",
        },
        {
          type: "title",
          title: "Follow us on",
          styling: { fontSize: 15, marginTop: 20 },
        },
        {
          type: "container",
          styling: { flexDirection: "row" },
          children: [
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              styling: {
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 30,
              },
            },
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              styling: {
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 30,
              },
            },
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              styling: {
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 30,
              },
            },
          ],
        },
      ],
    },
    {
      type: "tab",
      title: "T&C",
      key: "TermsAndConditions",
      children: [
        {
          type: "markdown",
          content: "Sint voluptate ad irure esse et anim officia elit ",
        },
      ],
    },
    {
      type: "tab",
      title: "Privacy Policy",
      key: "PrivacyPolicy",
      children: [
        {
          type: "markdown",
          content:
            "Sint voluptate ad irure esse et anim officia elit culpa nulla laborum sint. Veniam commodo ad esse officia enim sit esse ad veniam aliqua non. In laborum magna exercitation sunt. Enim pariatur et exercitation ipsum exercitation reprehenderit.",
        },
      ],
    },
  ],
  pan_info: {
    screenTitle: "",
    data: [
      {
        type: "container",
        styling: { padding: "5%" },

        children: [
          {
            type: "title",
            styling: { textAlign: "center" },
            title: "I don't have a Pan Card, what should I do?",
          },
          {
            type: "subtitle",
            styling: { color: "grey", textAlign: "center", lineHeight: 20 },
            title:
              "Don't worry, you can simply apply for an e-PAN card from the website of the Income Tax Department. Applying for PAN is absolutely free and it takes only 5 minutes.",
          },
          {
            type: "twoColumn",
            widths: ["35%", "65%"],
            styling: { margin: 0, marginVertical: "8%" },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/Logo.png",
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                children: [
                  {
                    type: "title",
                    title: "How to Apply for an e-PAN Card?",
                  },
                  {
                    type: "subtitle",
                    title:
                      "Follow these simple steps to apply for an e-PAN Card:",
                  },
                ],
              },
            ],
          },
          {
            type: "subtitle",
            styling: { color: "black", lineHeight: 20 },
            title:
              "1. Visit the official website of the Income Tax Department.\n2. Click on the 'Instant PAN through Aadhaar' option.\n3. Enter your Aadhaar number and captcha code.\n4. Click on 'Generate Aadhaar OTP'.\n5. Verify your Aadhaar details.\n6. Click on 'Submit' to generate your e-PAN Card.",
          },
          {
            type: "twoColumn",
            widths: ["35%", "65%"],
            styling: { margin: 0, marginTop: "8%" },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/Logo.png",
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                children: [
                  {
                    type: "title",
                    title: "Charges for e-PAN Card?",
                  },
                  {
                    type: "subtitle",
                    title:
                      "There are no charges for e-PAN Card application. It is completely free of cost.",
                  },
                ],
              },
            ],
          },
          {
            type: "twoColumn",
            widths: ["35%", "65%"],
            styling: { margin: 0, marginVertical: "8%" },
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/KYC/Logo.png",
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                children: [
                  {
                    type: "title",
                    title: "Time to Generate e-PAN Card?",
                  },
                  {
                    type: "subtitle",
                    title:
                      "Follow these simple steps to apply for an e-PAN Card:",
                  },
                ],
              },
            ],
          },
          {
            type: "subtitle",
            styling: {
              color: "black",
              textAlign: "center",
              lineHeight: 24,
              fontSize: 16,
            },
            title:
              "For any further assistance, please refer to this link: https://www.incometax.gov.in/iec/foportal/help/how-to-generate-instant-e-pan",
          },
        ],
      },
    ],
  },
  salary_info: {
    screenTitle: "",
    data: [
      {
        type: "container",
        styling: { padding: "5%" },

        children: [
          {
            type: "title",
            styling: { textAlign: "center", fontSize: 24 },
            title: "Why was my advance salary request rejected?",
          },
          {
            type: "subtitle",
            styling: {
              color: "grey",
              textAlign: "center",
              lineHeight: 24,
              fontSize: 16,
              marginTop: "5%",
            },
            title:
              "If your advance salary request is rejected and could not clear the lending partner policies. You can reach out to us to become eligible.",
          },
          {
            type: "title",
            styling: { fontSize: 18, marginBottom: "5%", marginTop: "10%" },
            title: "Some of the reasons why your request was rejected:",
          },
          {
            type: "subtitle",
            styling: {
              color: "black",
              lineHeight: 26,
              fontSize: 18,
            },
            title:
              "1. Salary is still processing in progress on your employer end\n2. Name mismatch in PAN and Bank account holder name\n3. You have low bureau score (credit score)",
          },
        ],
      },
      { type: "footer" },
    ],
  },
  language_selection: [{}],
};

export const DUMMY_RES_HINDI = {
  kyc_help: {
    screenTitle: "Help - KYC वेरिफिकेशन",
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
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                children: [
                  {
                    type: "title",
                    title: "KYC वेरिफिकेशन सिर्फ 3 आसान चरणों में",
                  },
                  {
                    type: "subtitle",
                    title:
                      "अपनी पहचान को पुष्टि करें, KYC प्रक्रिया को पूरा करें और निकालें अपनी एडवांस सैलरी।",
                  },
                ],
              },
            ],
          },
          {
            type: "button",
            title: "KYC शुरू करें  >",
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
              { type: "badge", text: "स्टेप 1" },
              {
                type: "title",
                title: "आधार वेरीफिकेशन",
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
                  "अपना आधार संख्या दर्ज करें और ओटीपी के साथ वेरीफाई करें",
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
              { type: "badge", text: "स्टेप 2" },
              {
                type: "title",
                title: "पैन कार्ड वेरीफिकेशन",
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
                title: "अपना पैन कार्ड नंबर दर्ज करें और विवरण की पुष्टि करें।",
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
              { type: "badge", text: "स्टेप 3" },
              {
                type: "title",
                title: "बैंक खाता जोड़ें",
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
                  "एडवांस सैलरी प्राप्त करने के लिए अपना बैंक खाता संख्या दर्ज करें",
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
        title: "अक्सर पूछे जाने वाले प्रश्नों",
        children: [
          {
            type: "collapsibleList",
            title: "प्र. क्या मुझे KYC के लिए भुगतान करने की आवश्यकता है?",
            subtitle: "उ. नहीं, केवाईसी निःशुल्क है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. मुझे KYC करने की आवश्यकता क्यों है?",
            subtitle:
              "उ. भारतीय रिजर्व बैंक के नियमों के अनुसार, KYC सत्यापन अनिवार्य है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. KYC प्रक्रिया में कितना समय लगेगा?",
            subtitle: "उ. KYC सरकार API के साथ तुरंत होता है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. अगर मैं अपना KYC पूरा नहीं करता तो क्या होगा?",
            subtitle: "उ. आप एडवांस सैलरी नहीं निकाल पाएंगे।",
          },
        ],
      },
      { type: "footer" },
    ],
  },
  aadhaar_help: {
    screenTitle: "Help - Aadhaar Verification",
    data: [
      {
        children: [
          {
            children: [
              {
                styling: {
                  aspectRatio: 1.6,
                  flex: 1,
                  width: "100%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/Logo.png",
              },
              {
                children: [
                  {
                    title: "आधार वेरिफिकेशन कैसे करें?",
                    type: "title",
                  },
                  {
                    title: "इस 3-स्टेप प्रक्रिया का पालन करें",
                    type: "subtitle",
                  },
                ],
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                type: "container",
              },
            ],
            styling: {
              margin: 0,
            },
            type: "twoColumn",
            widths: ["35%", "65%"],
          },
          {
            clickType: "navigation",
            styling: {
              marginVertical: "10%",
            },
            title: "AADHAAR वेरीफाई करें  > ",
            type: "button",
            variant: "filled",
          },
          {
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
            type: "video",
          },
          {
            children: [
              {
                text: "स्टेप 1",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "आधार नंबर",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title: "अपना 12 अंकों का आधार कार्ड नंबर दर्ज करें",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "स्टेप 2",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "आधार ओटीपी",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title: "आधार पंजीकृत मोबाइल नंबर पर प्राप्त ओटीपी दर्ज करें",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "स्टेप 3",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "Confirm Identity",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title: "अपने आधार विवरण की पुष्टि करें - नाम, जन्म तिथि और पता",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
        ],
        styling: {
          padding: "4%",
        },
        type: "container",
      },
      {
        title: "अक्सर पूछे जाने वाले प्रश्नों",
        type: "section",
        children: [
          {
            subtitle: "प्र. मुझे आधार को वेरीफाई करने की आवश्यकता क्यों है?",
            title:
              "उ. डिजिटल आधार वेरीफाई आपकी पहचान और पते को प्रमाणित करता है",
            type: "collapsibleList",
          },
          {
            subtitle: "प्र. आधार ओटीपी क्या है?",
            title:
              "उ. आधार OTP को UIDAI के माध्यम से प्रमाणीकरण उद्देश्यों के लिए भेजा जाता है।",
            type: "collapsibleList",
          },
          {
            subtitle:
              "प्र. क्या मुझे अपने आधार कार्ड की फिजिकल कॉपी जमा करने की जरूरत है?",
            title: "उ. नहीं, आधार वेरिफिकेशन एक डिजिटल प्रक्रिया है।",
            type: "collapsibleList",
          },
          {
            type: "collapsibleList",
            title: "प्र. मुझे नहीं पता कि कौन सा मोबाइल नंबर आधार से लिंक है",
            subtitle:
              "उ. इस प्रक्रिया का पालन करें:\nस्टेप 1: https://myaadhaar.uidai.gov.in/verifyAadhaar पर जाएं\nस्टेप 2: 12 अंकों का आधार नंबर और कैप्चा कोड डालें\n'प्रोसीड टू वेरिफाई' पर क्लिक करें\nयहां आपको लिंक किए गए मोबाइल नंबर के अंतिम तीन अंक दिखाई देंगे।",
          },
          {
            subtitle: "A:उ. नहीं, आधार वेरिफिकेशन एक डिजिटल प्रक्रिया है।",
            title:
              "प्र. क्या मुझे अपने आधार कार्ड की फिजिकल कॉपी जमा करने की जरूरत है",
            type: "collapsibleList",
          },
        ],
      },
      {
        type: "footer",
      },
    ],
  },
  pan_help: {
    data: [
      {
        children: [
          {
            children: [
              {
                styling: {
                  aspectRatio: 1.6,
                  flex: 1,
                  width: "100%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/PAN/Logo.png",
              },
              {
                children: [
                  {
                    title: "पैन कार्ड वेरिफिकेशन कैसे करें?",
                    type: "title",
                  },
                  {
                    title: "इस 2-चरण प्रक्रिया का पालन करें",
                    type: "subtitle",
                  },
                ],
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                type: "container",
              },
            ],
            styling: {
              margin: 0,
            },
            type: "twoColumn",
            widths: ["35%", "65%"],
          },
          {
            clickType: "navigation",
            styling: {
              marginVertical: "10%",
            },
            title: "पैन वेरीफाई करें  >",
            type: "button",
            variant: "filled",
          },
          {
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
            type: "video",
          },

          {
            children: [
              {
                text: "स्टेप 1:",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "पैन नंबर",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title: "अपना पैन कार्ड नंबर पैन दर्ज करें (स्थायी खाता संख्या)",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "स्टेप 2:",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "विवरण की पुष्टि करें",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },

          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "अपने पैन विवरण की पुष्टि करें - नाम, पिता का नाम और जन्म तिथि",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
        ],
        styling: {
          padding: "4%",
        },
        type: "container",
      },
      {
        children: [
          {
            subtitle:
              "उ. पैन कार्ड वेरिफिकेशन आपकी आय और पहचान को प्रमाणित करता है",
            title:
              "प्र. मुझे अपने पैन कार्ड को वेरीफाई करने की आवश्यकता क्यों है?",
            type: "collapsibleList",
          },
          {
            subtitle: "उ. नहीं, पैन वेरिफिकेशन एक डिजिटल प्रक्रिया है।",
            title:
              "प्र. क्या मुझे अपने पैन कार्ड की फिजिकल कॉपी जमा करने की आवश्यकता है",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. आप आयकर विभाग की वेबसाइट पर तत्काल ई-पैन कार्ड बिल्कुल मुफ्त बना सकते हैं। (5 मिनट के अंदर) ",
            title: "प्र. मेरे पास पैन कार्ड नहीं है, मुझे क्या करना चाहिए?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. आप निम्नलिखित में से किसी भी तरीके से अपना पैन कार्ड नंबर ढूंढ सकते हैं:\n\nविकल्प 1: आयकर वेबसाइट\nhttps://www.incometaxindiafiling.gov.in/ पर जाएं\n क्विक लिंक्स सेक्शन के में अपने पैन को जानें पर क्लिक करें\nविवरण दर्ज करें - नाम, जन्म तिथि और मोबाइल नंबर सहित \nमोबाइल नंबर पर प्राप्त OTP दर्ज करें और Validate पर क्लिक करें \nअब अपने पिता का नाम दर्ज करें और सबमिट बटन पर क्लिक करें \n\nविकल्प 2: सैलरी स्लिप\n अपना पैन नंबर खोजने के लिए अपनी सैलरी स्लिप देखें। यदि आप अपनी कंपनी से नियमित वेतन भुगतान प्राप्त करते हैं तो पैन नंबर का सैलरी स्लिप से प्राप्त कर सकते हैं। यदि आपको पैन नंबर नहीं मिल रहा है, तो सहायता के लिए अपने HR या Accounts विभाग से संपर्क करें। \n\nविकल्प 3: फॉर्म-16\nपैन नंबरों का उल्लेख आपकी कंपनी द्वारा आपको दिए गए फॉर्म 16 में किया जाता है। अधिकांश कंपनी अपने कर्मचारियों को फॉर्म 16 मेल करते हैं और/या आंतरिक पोर्टल पर अपलोड करते हैं।",
            title:
              "प्र. मुझे अपना पैन कार्ड नंबर याद नहीं है, मुझे क्या करना चाहिए?",
            type: "collapsibleList",
          },
        ],
        title: "अक्सर पूछे जाने वाले प्रश्नों",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Help - PAN Card Verification",
  },
  bank_help: {
    data: [
      {
        children: [
          {
            children: [
              {
                styling: {
                  aspectRatio: 1.6,
                  flex: 1,
                  width: "100%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/Logo.png",
              },
              {
                children: [
                  {
                    title: "बैंक खाता कैसे जोड़ें?",
                    type: "title",
                  },
                  {
                    title: "इस 2-स्टेप प्रक्रिया का पालन करें",
                    type: "subtitle",
                  },
                ],
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                type: "container",
              },
            ],
            styling: {
              margin: 0,
            },
            type: "twoColumn",
            widths: ["35%", "65%"],
          },
          {
            clickType: "navigation",
            styling: {
              marginVertical: "10%",
            },
            title: "बैंक खाता जोड़ें",
            type: "button",
            variant: "filled",
          },
          {
            size: "large",
            thumbnail:
              "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
            type: "video",
          },
          {
            children: [
              {
                text: "स्टेप 1:",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "बैंक खाता विवरण",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "खाताधारक का नाम (अपना नाम), खाता संख्या, IFSC कोड प्रदान करें",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
          {
            children: [
              {
                text: "स्टेप 2:",
                type: "badge",
              },
              {
                styling: {
                  fontSize: 18,
                  marginLeft: "10%",
                },
                title: "बैंक खाते की पुष्टि करें",
                type: "title",
              },
            ],
            styling: {
              alignItems: "center",
              flexDirection: "row",
              marginVertical: "5%",
            },
            type: "container",
          },
          {
            children: [
              {
                styling: {
                  fontSize: 16,
                },
                title:
                  "अपने खाते के विवरण की पुष्टि करें - नाम, खाता संख्या और IFSC",
                type: "subtitle",
              },
              {
                styling: {
                  marginTop: "5%",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
              },
            ],
            styling: {
              paddingTop: 0,
            },
            type: "container",
          },
        ],
        styling: {
          padding: "4%",
        },
        type: "container",
      },
      {
        children: [
          {
            title: "प्र. मुझे बैंक खाता जोड़ने की आवश्यकता क्यों है?",
            subtitle:
              "उ. आपकी एडवांस सैलरी का पैसा इसी खाते में जमा किया जाएगा",
            type: "collapsibleList",
          },
          {
            title: "प्र. क्या मेरा अपना खाता जोड़ना अनिवार्य है?",
            subtitle: "उ. हाँ, आपको अपना खुद का बैंक खाता उपलब्ध कराना होगा।",
            type: "collapsibleList",
          },
          {
            title:
              "प्र. क्या मुझे बैंक खाते के भौतिक दस्तावेज जमा करने की आवश्यकता है?",
            subtitle: "उ. नहीं, बैंक खाता जोड़ना एक डिजिटल प्रक्रिया है।",

            type: "collapsibleList",
          },
        ],
        title: "अक्सर पूछे जाने वाले प्रश्नों",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Help - Bank Verification",
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
                styling: { width: "100%", flex: 1, aspectRatio: 1.6 },
              },
              {
                type: "container",
                styling: {
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: "5%",
                },
                children: [
                  {
                    type: "title",
                    title: "पुनर्भुगतान कैसे सेटअप करें?",
                  },
                  {
                    type: "subtitle",
                    title:
                      "एडवांस सैलरी के पुनर्भुगतान को सेटअप करने के लिए कोई एक तरीका चुनें। एक बार मैंडेट सेटअप हो जाने के बाद, नियत तिथियों पर राशि स्वतः ही कट जाएगी।",
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
              { type: "badge", text: "विकल्प 1:" },
              {
                type: "title",
                title: "डेबिट कार्ड",
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
                  "डेबिट कार्ड के साथ मैंडेट पूरा करने के लिए, अपने डेबिट कार्ड का विवरण डालें और अपने मैंडेट को प्रमाणित करने के लिए ओटीपी प्रदान करें।",
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
              { type: "badge", text: "विकल्प 2:" },
              {
                type: "title",
                title: "नेट बैंकिंग",
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
                  "नेट बैंकिंग के साथ मैंडेट पूरा करने के लिए, अपना मैंडेट प्रमाणित करने के लिए अपना लॉगिन विवरण और ओटीपी दर्ज करें।",
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
              { type: "badge", text: "विकल्प 3:" },
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
                  "आधार के साथ अपना मैंडेट पूरा करने के लिए, आपको अपने मैंडेट को प्रमाणित करने के लिए पंजीकृत मोबाइल नंबर पर प्राप्त ओटीपी दर्ज करना होगा।",
                styling: { fontSize: 16 },
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "अक्सर पूछे जाने वाले प्रश्नों",
        children: [
          {
            type: "collapsibleList",
            title: "प्र. क्या पुनर्भुगतान सेटअप (मैंडेट) अनिवार्य है?",
            subtitle:
              "उ. हाँ। यह 100% सुरक्षित है और RBI द्वारा अनुमोदित इकाई द्वारा निष्पादित किया जाता है।",
          },
          {
            type: "collapsibleList",
            title:
              "प्र. पुनर्भुगतान के लिए बैंक खाते में अपर्याप्त राशि होने की स्थिति में क्या होता है?",
            subtitle:
              "उ. लेन -देन विफल हो जाएगा और अतिरिक्त जुर्माना शुल्क लगाया जा सकता है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. मैंडेट रजिस्टर करने का सबसे तेज़ तरीका क्या है?",
            subtitle: "उ. डेबिट कार्ड",
          },
          {
            type: "collapsibleList",
            title: "प्र. आधार मैंडेट में कितना वक्त लगेगा?",
            subtitle: "उ. 4-5 बैंकिंग दिन",
          },
        ],
      },
      { type: "footer" },
    ],
  },
  account_navigation_list: [
    {
      children: [
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/profile.png ",
            },
            {
              children: [
                {
                  title: "Profile",
                  type: "title",
                },
                {
                  title: "See & edit your profile details",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "Profile",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/payslip.png ",
            },
            {
              children: [
                {
                  title: "Pay Slips",
                  type: "title",
                },
                {
                  title: "View and download payslips",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "Profile",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/KYC.png ",
            },
            {
              children: [
                {
                  title: "KYC",
                  type: "title",
                },
                {
                  title: "All your KYC details in one place",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "KYC",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Support.png ",
            },
            {
              children: [
                {
                  title: "Customer Support",
                  type: "title",
                },
                {
                  title: "Talk to our support team",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            params: { blogKey: "customer_support" },
            type: "cms",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/Feedback.png",
            },
            {
              children: [
                {
                  title: "Submit Feedback",
                  type: "title",
                },
                {
                  title: "Let us know your experience with us",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            screen: "Profile",
            type: "app",
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
        {
          children: [
            {
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/AboutUs.png ",
            },
            {
              children: [
                {
                  title: "About Us",
                  type: "title",
                },
                {
                  title: "Read about us & our terms of use",
                  type: "subtitle",
                },
              ],
              styling: {
                paddingLeft: "5%",
              },
              type: "container",
            },
            {
              iconColor: "#5E8290",
              iconName: "chevron-right",
              iconSize: 28,
              type: "icon",
            },
          ],
          navigate: {
            type: "app",
            stack: "AccountStack",
            screen: "TabsScreen",
            params: { key: "about_us" },
          },
          secondColumnStyle: {
            flex: 1,
            paddingLeft: 15,
          },
          type: "threeColumn",
          widths: ["10%", "80%", "10%"],
        },
      ],
      type: "container",
    },
  ],
  blog_1: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            children: [
              {
                title: "KYC क्या है?",
                type: "title",
              },
              {
                title:
                  "एडवांस सैलरी जैसी सुविधाओं उपलब्ध कराने के लिए KYC एक अनिवार्य प्रक्रिया है जो कर्मचारी की पहचान को वेरीफाई करती है।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            children: [
              {
                title: "KYC क्यों पूरा करें?",
                type: "title",
              },
              {
                title:
                  "Unipe एडवांस सैलरी भारतीय रिजर्व बैंक द्वारा स्वीकृत लेंडिंग पार्टनर्स द्वारा संचालित है, जो एडवांस सैलरी का लाभ उठाने के लिए केवाईसी को पूरा करना अनिवार्य करता है।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            children: [
              {
                title: "अपूर्ण KYC के जोखिम",
                type: "title",
              },
              {
                title:
                  "KYC पूरा होने के बिना, कर्मचारी अपने बैंक खाते में एडवांस सैलरी राशि नहीं निकाल पाएंगे।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            children: [
              {
                title: "KYC के साथ करें एडवांस अनलॉक",
                type: "title",
              },
              {
                title:
                  "एक बार केवाईसी हो जाने के बाद, अग्रिम वेतन शेष राशि अनलॉक हो जाएगी और कर्मचारी बिना किसी सीमा के दिखाई गई राशि को निकाल सकते हैं।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            children: [
              {
                title: "KYC के बिना एडवांस",
                type: "title",
              },
              {
                title:
                  "यदि KYC नहीं किया जाता है और कंपनी से एडवांस सैलरी स्वीकृत किया जाता है, तो कर्मचारी एडवांस सैलरी राशि देख सकेंगे लेकिन इसे निकाल नहीं सकेंगे।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            type: "collapsibleList",
            title: "प्र. क्या मुझे KYC के लिए भुगतान करने की आवश्यकता है?",
            subtitle: "उ. नहीं, केवाईसी निःशुल्क है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. मुझे KYC करने की आवश्यकता क्यों है?",
            subtitle:
              "उ. भारतीय रिजर्व बैंक के नियमों के अनुसार, KYC सत्यापन अनिवार्य है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. KYC प्रक्रिया में कितना समय लगेगा?",
            subtitle: "उ. KYC सरकार API के साथ तुरंत होता है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. अगर मैं अपना KYC पूरा नहीं करता तो क्या होगा?",
            subtitle: "उ. आप एडवांस सैलरी नहीं निकाल पाएंगे।",
          },
        ],
        title: "FAQs",
        type: "section",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
    headline: "KYC को पूरा करने के क्या लाभ हैं?",
    screenTitle: "",
  },
  blog_2: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            children: [
              {
                title: "What is KYC?",
                type: "title",
              },
              {
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salrary.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            children: [
              {
                title: "Why Complete KYC?",
                type: "title",
              },
              {
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            children: [
              {
                title: "Risks of Incomplete KYC",
                type: "title",
              },
              {
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            children: [
              {
                title: "Unlock Advance with KYC",
                type: "title",
              },
              {
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            children: [
              {
                title: "Advance without KYC",
                type: "title",
              },
              {
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            subtitle: "A. Search on the internet",
            title: "Q. How to complete KYC Verification?",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I don't have PAN Card",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I have not received my advance salary",
            type: "collapsibleList",
          },
        ],
        title: "FAQs",
        type: "section",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
    headline: "What are the benefits of completing KYC?",
    screenTitle: "",
  },
  blog_3: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            aspectRatio: 0.88,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/WhatMandate.png",
          },
          {
            children: [
              {
                title: "ई-मैंडेट क्या है?",
                type: "title",
              },
              {
                title:
                  "E-Mandate एक सरल और वन टाइम रजिस्ट्रेशन प्रक्रिया है जो एडवांस सैलरी राशि के स्वत: पुनर्भुगतान को सक्षम बनाता है।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            aspectRatio: 0.88,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/OneTimeProc.png",
          },
          {
            children: [
              {
                title: "वन टाइम रजिस्ट्रेशन",
                type: "title",
              },
              {
                title:
                  "आपको अपनी भविष्य की सभी एडवांस सैलरी आवश्यकताओं को पूरा करने के लिए केवल एक बार पंजीकरण करना होगा।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            aspectRatio: 0.88,
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/SaveMoney.png",
          },
          {
            children: [
              {
                title: "पुनर्भुगतान के साथ बचाएं पैसे",
                type: "title",
              },
              {
                title:
                  "ई-मैंडेट पंजीकरण स्वत: पुनर्भुगतान सुनिश्चित करता है और आप विलंबित पुनर्भुगतान के कारण बने ब्याज शुल्क से बच सकते हैं।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            aspectRatio: 0.78,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/Mandate/AvoidLateFine.png",
          },
          {
            children: [
              {
                title: "लेट फीस से बचें",
                type: "title",
              },
              {
                title:
                  "ई-मैन्डेट पंजीकरण के माध्यम से एडवांस सैलरी राशि का समय पर पुनर्भुगतान यह सुनिश्चित करता है कि कर्मचारी किसी भी देर से जुर्माना से सुरक्षित हैं जो देरी से पुनर्भुगतान के मामले में चार्ज किए जा सकते हैं।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            type: "collapsibleList",
            title: "प्र. क्या पुनर्भुगतान सेटअप (मैंडेट) अनिवार्य है?",
            subtitle:
              "उ. हाँ। यह 100% सुरक्षित है और RBI द्वारा अनुमोदित इकाई द्वारा निष्पादित किया जाता है।",
          },
          {
            type: "collapsibleList",
            title:
              "प्र. पुनर्भुगतान के लिए बैंक खाते में अपर्याप्त राशि होने की स्थिति में क्या होता है?",
            subtitle:
              "उ. लेन -देन विफल हो जाएगा और अतिरिक्त जुर्माना शुल्क लगाया जा सकता है।",
          },
          {
            type: "collapsibleList",
            title: "प्र. मैंडेट रजिस्टर करने का सबसे तेज़ तरीका क्या है?",
            subtitle: "उ. डेबिट कार्ड",
          },
          {
            type: "collapsibleList",
            title: "प्र. आधार मैंडेट में कितना वक्त लगेगा?",
            subtitle: "उ. 4-5 बैंकिंग दिन",
          },
        ],
        title: "FAQs",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
    headline: "ई-मैन्डेट पंजीकरण के क्या लाभ हैं?",
    screenTitle: "",
  },
  blog_4: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
          },
          {
            children: [
              {
                title: "What is KYC?",
                type: "title",
              },
              {
                title:
                  "KYC (Know Your Customer) is a mandatory process of identifying and verifying the employee's identity while offering features like advance salrary.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhyCompleteKYC.png",
          },
          {
            children: [
              {
                title: "Why Complete KYC?",
                type: "title",
              },
              {
                title:
                  "Unipe advance salary is powered by RBI approved lending partners which mandates completion of Full KYC to avail the advance salary balance.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/RisksofIncompleteKYC.png",
          },
          {
            children: [
              {
                title: "Risks of Incomplete KYC",
                type: "title",
              },
              {
                title:
                  "Without KYC completion, employees will not be able to withdraw advance salary balance to their bank account.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/UnlockAdvancewithKYC.png",
          },
          {
            children: [
              {
                title: "Unlock Advance with KYC",
                type: "title",
              },
              {
                title:
                  "One the KYC is done, the Advance Salary balance will be unlocked and employees can transfer the shown amount without any limit.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/AdvancewithoutKYC.png",
          },
          {
            children: [
              {
                title: "Advance without KYC",
                type: "title",
              },
              {
                title:
                  "If KYC is not done and the advance is approved from the employer, the employees will be able to see the amount but will not be able to withdraw it.",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            subtitle: "A. Search on the internet",
            title: "Q. How to complete KYC Verification?",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. My advance salary balance is 0 (Waiting for approval)",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I don't have PAN Card",
            type: "collapsibleList",
          },
          {
            subtitle: "A. Search on the internet",
            title: "Q. I have not received my advance salary",
            type: "collapsibleList",
          },
        ],
        title: "FAQs",
        type: "section",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
    headline: "What are the benefits of completing KYC?",
    screenTitle: "",
  },
  blog_5: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/What.png",
          },
          {
            children: [
              {
                title: "एडवांस सैलरी क्या है?",
                type: "title",
              },
              {
                title:
                  "एडवांस सैलरी विकल्प कर्मचारियों को महीने के अंत से पहले अर्जित वेतन निकालने की क्षमता प्रदान करता है।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            type: "image",
            aspectRatio: 0.8,
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/zeroInterest.png",
          },
          {
            children: [
              {
                title: "शून्य ब्याज के साथ एडवांस",
                type: "title",
              },
              {
                title:
                  "एडवांस सैलरी के साथ आप बिना किसी ब्याज शुल्क के महीने के अंत से पहले अपना अर्जित वेतन तुरंत प्राप्त कर सकते हैं। ",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/JoiningFees.png",
          },
          {
            children: [
              {
                title: "कोई जोइनिंग फीस नहीं]",
                type: "title",
              },
              {
                title:
                  "बिना किसी ज्वाइनिंग फीस के अपने एडवांस सैलरी को निकालने के लिए अपनी KYC प्रक्रिया को पूरा करना ही एकमात्र आवश्यकता है।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            styling: {
              marginLeft: "15%",
            },
            aspectRatio: 0.92,
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/AdvanceSalary/AvoidLoans.png",
          },
          {
            children: [
              {
                title: "अधिक ब्याज वाले ऋणों से बचें",
                type: "title",
              },
              {
                title:
                  "अग्रिम वेतन का उपयोग करके, आप उच्च-ब्याज ऋण लेने से बच सकते हैं जब आपको तत्काल नकदी की आवश्यकता होती है, तो वित्तीय सुरक्षा प्रदान करते हैं।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        styling: {
          flexDirection: "row-reverse",
        },
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            title: "एडवांस सैलरी राशि के लिए तैयार हैं?",
            type: "title",
          },
          {
            type: "button",
            variant: "filled",
            title: "एडवांस निकालें",
            clickType: "navigation",
            navigate: {
              type: "app",
              stack: "HomeStack",
              screen: "Money",
            },
          },
        ],
        styling: { paddingLeft: "10%", paddingRight: "10%" },
        type: "container",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
    headline: "एडवांस सैलरी के क्या लाभ हैं?",
    screenTitle: "",
  },
  blog_6: {
    data: [
      {
        children: [
          {
            styling: {
              marginLeft: "-15%",
            },
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/PF/What.png",
          },
          {
            children: [
              {
                title: "पीएफ बैलेंस क्या है?",
                type: "title",
              },
              {
                title:
                  "पीएफ बैलेंस वह राशि है जो आपके प्रोविडेंट फंड खाते में जमा किया गया है। यह आपके सेवानिवृत्ति के वर्षों के लिए आपकी बचत है।",
                type: "subtitle",
              },
            ],
            type: "container",
          },
        ],
        type: "twoColumn",
        widths: ["30%", "70%"],
      },
      {
        children: [
          {
            children: [
              {
                content:
                  "### आप चार तरीकों से अपना पीएफ बैलेंस चेक कर सकते हैं\n#### 1. ईपीएफओ पोर्टल से\nईपीएफओ पोर्टल के माध्यम से अपने पीएफ बैलेंस की जांच करने के लिए इन सरल चरणों का पालन करें:  \n  \n- ईपीएफओ ​​पोर्टल पर जाएं [EPFO portal](https://www.epfindia.gov.in/site_en/index.php)  \n- 'हमारी सेवाएं' (Our Service) टैब पर जाएं और 'कर्मचारियों के लिए' दिया गया विकल्प चुनें  \n- 'सदस्य पासबुक' पर क्लिक करें \n- अपना UAN (यूनिवर्सल अकाउंट नंबर) और पासवर्ड दर्ज करें  \n- 'लॉगिन' पर क्लिक करें और अपना पीएफ बैलेंस देखें\n\n####  2. उमंग ऐप के माध्यम से\nउमंग ऐप के माध्यम से अपने पीएफ बैलेंस की जांच करने के लिए, इन चरणों का पालन करें:  \n  \n- उमंग ऐप को गूगल प्लेस्टोर या ऐप स्टोर से डाउनलोड करें  \n- अपने मोबाइल नंबर का उपयोग करके ऐप पर रजिस्टर करें  \n- 'EPFO' विकल्प पर क्लिक करें और 'कर्मचारी केंद्रित सेवाएं' चुनें   \n- लॉग इन करने के लिए अपना UAN (यूनिवर्सल अकाउंट नंबर) और OTP दर्ज करें \n- अपना पीएफ बैलेंस देखें\n\n####  3. मिस्ड कॉल सेवा के माध्यम से\nमिस्ड कॉल सेवा के माध्यम से अपने पीएफ बैलेंस की जांच करने के लिए, इन चरणों का पालन करें:  \n  \n- सुनिश्चित करें कि आपका UAN (यूनिवर्सल अकाउंट नंबर) आपके आधार और बैंक खाते से जुड़ा हुआ है  \n- अपने पंजीकृत मोबाइल नंबर से [011-22901406](tel:+911122901406) नंबर पर एक मिस्ड कॉल दें\n- अपने पीएफ बैलेंस के साथ एक एसएमएस प्राप्त करें  \n  \n####  4. एक एसएमएस भेजकर \nएसएमएस भेजकर अपने पीएफ बैलेंस की जांच करने के लिए, इन चरणों का पालन करें: \n- सुनिश्चित करें कि आपका UAN (यूनिवर्सल अकाउंट नंबर) आपके आधार और बैंक खाते से जुड़ा हुआ है  \n- EPFOHO UAN HIN के साथ 7738299899 नंबर पर एक एसएमएस भेजें  \n- अपने पीएफ बैलेंस के साथ एक एसएमएस प्राप्त करें",
                type: "markdown",
              },
            ],
            styling: {
              padding: "5%",
            },
            type: "card",
          },
        ],
        styling: {
          padding: "5%",
        },
        type: "container",
      },
    ],
    headingImage:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
    headline: "कैसे चेक करें अपना पीएफ बैलेंस?",
    screenTitle: "",
  },
  blogs: {
    data: [
      {
        type: "container",
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "What are the benefits of completing KYC?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_1" },
              type: "cms",
            },
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "Why Unipe?",
                        type: "title",
                      },
                      {
                        title:
                          "Lorem Ipsum is simply dumm typesetting industry.",
                        type: "subtitle",
                      },
                      {
                        iconName: "video-outline",
                        title: "3 min video",
                        type: "iconText",
                      },
                    ],
                    type: "container",
                  },
                  {
                    thumbnail:
                      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                    type: "video",
                    size: "small",
                    videoUri: "ux6XLNiEpLs",
                  },
                ],
                type: "twoColumn",
              },
            ],
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "What are the benefits of Mandate Registration?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_3" },
              type: "cms",
            },
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "How Unipe Works?",
                        type: "title",
                      },
                      {
                        title:
                          "Lorem Ipsum is simply dumm typesetting industry.",
                        type: "subtitle",
                      },
                      {
                        iconName: "video-outline",
                        title: "3 min video",
                        type: "iconText",
                      },
                    ],
                    type: "container",
                  },
                  {
                    thumbnail:
                      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                    type: "video",
                    size: "small",
                    videoUri: "ux6XLNiEpLs",
                  },
                ],
                type: "twoColumn",
              },
            ],
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "What are the benefits of Advance Salary?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_5" },
              type: "cms",
            },
            type: "card",
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        title: "How do I check my PF Balance?",
                        type: "title",
                      },
                    ],
                    type: "container",
                  },
                  {
                    type: "image",
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
                  },
                ],
                type: "twoColumn",
                widths: ["70%", "30%"],
              },
            ],
            navigate: {
              params: { blogKey: "blog_6" },
              type: "cms",
            },
            type: "card",
          },
        ],
        styling: {
          padding: "15%",
        },
      },
    ],
    headingImage: "",
    headline: "",
    screenTitle: "Learn With U",
  },
  customer_support: {
    data: [
      {
        children: [
          {
            subtitle:
              "उ. ऑन-डिमांड सैलरी या एअर्नेड वेज एक्सेस (EWA) एक ऐसी सेवा है जिसके द्वारा कर्मचारियों को नियमित वेतन दिन से पहले ही अपने वेतन के कुछ हिस्से का प्राप्त करने की सुविधा होती है। यह कर्मचारियों को सैलरी का एक हिस्सा आवश्यकता के हिसाब से निकालने में सक्षम बनता है।",
            title: "प्र. KYC सत्यापन कैसे पूरा करें?",
            type: "collapsibleList",
            navigate: { type: "cmsScreenTwo", params: { blogKey: "kyc_help" } },
          },
          {
            subtitle:
              "उ. आप अपनी अर्जित सैलरी का कुछ हिस्सा, सामान्यतः उपस्थिति या कार्यकाल के आधार पर निकाल सकते हैं। पेरोल प्रक्रिया के दौरान अग्रिम राशि आपके वेतन से स्वचालित रूप से काट ली जाएगी।",
            title: "प्र. मेरे पास पैन कार्ड नहीं है, मुझे क्या करना चाहिए?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. नहीं, ऑन-डिमांड सैलरी या EWA के साथ, कर्मचारी अपने अर्जित वेतन का केवल एक हिस्सा ही निकाल सकते हैं। निकासी के लिए उपलब्ध राशि सामान्यतः मासिक वेतन की कुल राशि से कम होती है।",
            title:
              "प्र. मेरी एडवांस सैलरी रिक्वेस्ट को क्यों अस्वीकार कर दिया गया?",
            type: "collapsibleList",
          },
        ],
        title: "सर्वाधिक पूछे गए प्रश्न",
        type: "section",
      },
      {
        children: [
          {
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/KYC.png",
              },
              {
                children: [
                  {
                    title: "kyc Verification",
                    type: "title",
                  },
                  {
                    title: "All your kyc related queries at one place",
                    type: "subtitle",
                  },
                ],
                styling: {
                  paddingLeft: "5%",
                },
                type: "container",
              },
              {
                iconColor: "#5E8290",
                iconName: "chevron-right",
                iconSize: 28,
                type: "icon",
              },
            ],
            navigate: {
              params: { blogKey: "kyc_help" },
              type: "cmsScreenTwo",
            },
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],
          },
          {
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/mandate.png",
              },
              {
                children: [
                  {
                    title: "Mandate",
                    type: "title",
                  },
                  {
                    title: "All your repayment related queries",
                    type: "subtitle",
                  },
                ],
                styling: {
                  paddingLeft: "5%",
                },
                type: "container",
              },
              {
                iconColor: "#5E8290",
                iconName: "chevron-right",
                iconSize: 28,
                type: "icon",
              },
            ],
            navigate: {
              params: { blogKey: "kyc_help" },
              type: "cmsScreenTwo",
            },
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],
          },
          {
            children: [
              {
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/circleIcons/SalaryWithdrawal.png",
              },
              {
                children: [
                  {
                    title: "Salary Withdrawal",
                    type: "title",
                  },
                  {
                    title: "All your salary related questions",
                    type: "subtitle",
                  },
                ],
                styling: {
                  paddingLeft: "5%",
                },
                type: "container",
              },
              {
                iconColor: "#5E8290",
                iconName: "chevron-right",
                iconSize: 28,
                type: "icon",
              },
            ],
            navigate: {
              params: { blogKey: "kyc_help" },
              type: "cmsScreenTwo",
            },
            type: "threeColumn",
            widths: ["10%", "80%", "10%"],
          },
        ],
        title: "Topics",
        type: "section",
      },
      {
        children: [
          {
            subtitle:
              "उ. ऑन-डिमांड सैलरी या एअर्नेड वेज एक्सेस (EWA) एक ऐसी सेवा है जिसके द्वारा कर्मचारियों को नियमित वेतन दिन से पहले ही अपने वेतन के कुछ हिस्से का प्राप्त करने की सुविधा होती है। यह कर्मचारियों को सैलरी का एक हिस्सा आवश्यकता के हिसाब से निकालने में सक्षम बनता है।",
            title: "प्र. ऑन-डिमांड सैलरी या एअर्नेड वेज एक्सेस (EWA) क्या है?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. आप अपनी अर्जित सैलरी का कुछ हिस्सा, सामान्यतः उपस्थिति या कार्यकाल के आधार पर निकाल सकते हैं। पेरोल प्रक्रिया के दौरान अग्रिम राशि आपके वेतन से स्वचालित रूप से काट ली जाएगी।",
            title:
              "प्र. ऑन-डिमांड सैलरी या एअर्नेड वेज एक्सेस (EWA) कैसे काम करता है?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. नहीं, ऑन-डिमांड सैलरी या EWA के साथ, कर्मचारी अपने अर्जित वेतन का केवल एक हिस्सा ही निकाल सकते हैं। निकासी के लिए उपलब्ध राशि सामान्यतः मासिक वेतन की कुल राशि से कम होती है।",
            title: "प. क्या कोई कर्मचारी अर्जित वेतन से अधिक निकाल सकता है?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. Unipe की ऑन-डिमांड सैलरी सुविधा ब्याज मुक्त है। हालांकि, निकासी के समय एक बहुत ही छोटी प्रोसेसिंग शुल्क लिया जा सकता है। यदि आप समय पर अगर आप समय पर एडवांस सैलरी चुकाते हैं तो अलग से कोई ब्याज नहीं लगेगा.",
            title: "प्र. क्या Unipe मुझसे लोन पर कोई शुल्क या ब्याज लेता है?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. आपको 24 बैंकिंग घंटों में मांगी गई ऑन डिमांड सैलरी प्राप्त होगी।",
            title: "प. मुझे कितनी जल्दी लोन मिल जाएगा?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. ली गई ऑन-डिमांड सैलरी राशि आपके पेरोल प्रोसेसिंग के समय आपके वेतन से स्वचालित रूप से काट ली जाएगी।",
            title:
              "प. अगर मैं आज 1000 रुपये ले लेता हूं, तो मुझे इसे कब वापस करना होगा?",
            type: "collapsibleList",
          },
          {
            subtitle:
              "उ. हां, कर्मचारी ऑन-डिमांड वेतन सुविधा का उपयोग करके एक महीने के भीतर कई बार विथड्रावल कर सकते हैं। हालांकि, कंपनी की नीतियों के अनुसार निकासी की कुल राशि सीमित होगी।",
            title: "प्र. क्या कोई कर्मचारी एकाधिक निकासी कर सकता है?",
            type: "collapsibleList",
          },
        ],
        title: "सामान्य सवाल",
        type: "section",
      },
      {
        type: "footer",
      },
    ],
    screenTitle: "Customer Support",
  },
  home: [
    {
      children: [
        {
          children: [
            {
              styling: {
                alignSelf: "center",
                marginBottom: "-40%",
                marginTop: "-20%",
              },
              type: "image",
              url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBanner.png",
            },
            {
              children: [
                {
                  children: [
                    {
                      type: "image",
                      url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBannerCurrentContest.png",
                    },
                  ],
                  type: "card",
                },
                {
                  children: [
                    {
                      type: "image",
                      url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/ContestBannerLastMonthWinners.png",
                    },
                  ],
                  gradientColors: ["#fff", "#fff"],
                  type: "card",
                },
              ],
              styling: {
                border: "1px solid black",
              },
              type: "twoColumn",
              widths: ["48%", "48%"],
            },
          ],
          type: "banner",
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title: "What are the benefits of completing KYC?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/KYCBenefits.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_1" },
                    type: "cms",
                  },
                  type: "card",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title:
                                "What are the benefits of Mandate Registration?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/MandateBenefits.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_3" },
                    type: "cms",
                  },
                  type: "card",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title: "What are the benefits of Advance Salary?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/AdvanceSalaryBenefits.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_5" },
                    type: "cms",
                  },
                  type: "card",
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              title: "How do I check my PF Balance?",
                              type: "title",
                            },
                          ],
                          type: "container",
                        },
                        {
                          type: "image",
                          url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsCards/CheckPFBalance.png",
                        },
                      ],
                      type: "twoColumn",
                      widths: ["70%", "30%"],
                    },
                  ],
                  navigate: {
                    params: { blogKey: "blog_6" },
                    type: "cms",
                  },
                  type: "card",
                },
              ],
              type: "swiper",
            },
          ],
          ctaRoute: "LearnWithUs",
          ctaText: "SEE ALL",
          gradientColors: ["#FFFFFF", "#FFFFFF"],
          leftIcon:
            "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/LearnWithUsIcon.png",
          styling: {
            marginTop: "10%",
            padding: 0,
          },
          title: "Learn With Us",
          type: "section",
          navigate: {
            type: "cms",
            params: {
              blogKey: "blogs",
            },
          },
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      title: "Why Unipe?",
                      type: "title",
                    },
                    {
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
                      type: "subtitle",
                    },
                  ],
                  styling: {
                    marginLeft: "5%",
                  },
                  type: "container",
                },
                {
                  size: "small",
                  thumbnail:
                    "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                  type: "video",
                  videoUri: "ux6XLNiEpLs",
                },
              ],
              styling: {
                flexDirection: "row-reverse",
              },
              type: "twoColumn",
            },
          ],
          gradientColors: ["#F2F8F9", "#F2F8F9"],
          navigate: {
            params: { blogKey: "blog_2" },
            type: "cms",
          },
          type: "card",
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      title: "How Unipe Works?",
                      type: "title",
                    },
                    {
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
                      type: "subtitle",
                    },
                  ],
                  styling: {
                    marginLeft: "5%",
                  },
                  type: "container",
                },
                {
                  size: "small",
                  thumbnail:
                    "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/HomePage/VideoThumbnail.png",
                  type: "video",
                  videoUri: "ux6XLNiEpLs",
                },
              ],
              styling: {
                flexDirection: "row-reverse",
              },
              type: "twoColumn",
            },
          ],
          gradientColors: ["#F2F8F9", "#F2F8F9"],
          navigate: {
            params: { blogKey: "blog_4" },
            type: "cms",
          },
          type: "card",
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
                    '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500."',
                },
                {
                  type: "twoColumn",
                  widths: ["11%", "89%"],
                  styling: { margin: 0, marginTop: "3%" },
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
                    '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500."',
                },
                {
                  type: "twoColumn",
                  widths: ["11%", "89%"],
                  styling: { margin: 0, marginTop: "3%" },
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
      styling: {
        padding: "4%",
      },
      type: "container",
    },
    {
      type: "footer",
    },
  ],
  login_success: {
    screenTitle: "",
    data: [
      {
        type: "container",
        styling: {
          padding: "4%",
          backgroundColor: "#223240",
          height: "98%",
          justifyContent: "space-between",
        },
        children: [
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
  },
  kyc_success: [
    {
      type: "container",
      styling: {
        padding: "4%",
        backgroundColor: "#223240",
        height: "98%",
        justifyContent: "space-between",
      },
      children: [
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
  mini_placement: [
    {
      type: "overlay",
      visible: true,
      styling: { backgroundColor: "#377476" },
      children: [
        {
          type: "container",
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
  notifications: {
    data: [],
    screenTitle: "Notifications",
  },
  bottom_alert: [
    {
      type: "bottomAlert",
      visible: true,
      children: [
        {
          type: "container",
          styling: {},
          children: [
            {
              type: "container",
              children: [
                {
                  type: "image",
                  url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/SplashScreens/Sorry.png",
                  styling: { marginBottom: "10%" },
                },
                { type: "title", title: "App Update Available" },
                {
                  type: "subtitle",
                  title:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                  styling: { flex: 0 },
                },
              ],
            },
            {
              type: "button",
              title: "Update Now",
              variant: "filled",
              clickType: "navigation",
              styling: { marginTop: "5%" },
            },
          ],
        },
      ],
    },
  ],
  about_us: [
    {
      type: "tab",
      title: "About Us",
      key: "AboutUs",
      children: [
        { type: "title", title: "About Us" },
        {
          type: "markdown",
          content:
            "Sint voluptate ad irure esse et anim officia elit culpa nulla laborum sint. Veniam commodo ad esse officia enim sit esse ad veniam aliqua non. In laborum magna exercitation sunt. Enim pariatur et exercitation ipsum exercitation reprehenderit.",
        },
        {
          type: "title",
          title: "Follow us on",
          styling: { fontSize: 15, marginTop: 20 },
        },
        {
          type: "container",
          styling: { flexDirection: "row" },
          children: [
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              styling: {
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 30,
              },
            },
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              styling: {
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 30,
              },
            },
            {
              type: "image",
              url: "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",
              styling: {
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 30,
              },
            },
          ],
        },
      ],
    },
    {
      type: "tab",
      title: "T&C",
      key: "TermsAndConditions",
      children: [
        {
          type: "markdown",
          content: "Sint voluptate ad irure esse et anim officia elit ",
        },
      ],
    },
    {
      type: "tab",
      title: "Privacy Policy",
      key: "PrivacyPolicy",
      children: [
        {
          type: "markdown",
          content:
            "Sint voluptate ad irure esse et anim officia elit culpa nulla laborum sint. Veniam commodo ad esse officia enim sit esse ad veniam aliqua non. In laborum magna exercitation sunt. Enim pariatur et exercitation ipsum exercitation reprehenderit.",
        },
      ],
    },
  ],
};

export const DUMMY_LANGUAGE_RES = {
  language_list: {
    localization_enabled: true,
    languages: [
      {
        type: "container",
        styling: {
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#fff",
        },
        children: [
          {
            type: "title",
            title:
              "\u092d\u093e\u0937\u093e \u091a\u0941\u0928\u0947 / Choose language",
            styling: { fontSize: 21, alignSelf: "center", lineHeight: null },
          },
          {
            type: "container",
            styling: {
              flexDirection: "row",
              padding: "7%",
              width: "100%",
              justifyContent: "space-evenly",
            },
            children: [
              {
                type: "card",
                gradientColors: ["#fff", "#fff"],
                navigate: {
                  language: "en",
                  type: "app",
                  stack: "OnboardingStack",
                  screen: "Login",
                },
                styling: {
                  flexDirection: "row",
                  alignItems: "center",
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "#DDE5E5",
                  borderRadius: 5,
                  padding: "7%",
                  backgroundColor: "white",
                },
                children: [
                  {
                    type: "image",
                    styling: {
                      width: 42,
                      height: 42,
                      resizeMode: "contain",
                    },
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/LanguageSelection/en.png",
                  },
                  {
                    type: "container",
                    children: [
                      {
                        type: "title",
                        title: "English",
                        styling: { fontSize: 18, marginLeft: 10 },
                      },
                    ],
                  },
                ],
              },
              {
                type: "card",
                gradientColors: ["#fff", "#fff"],
                navigate: {
                  language: "hi",
                  type: "app",
                  stack: "OnboardingStack",
                  screen: "Login",
                },
                styling: {
                  flexDirection: "row",
                  alignItems: "center",
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "#DDE5E5",
                  borderRadius: 5,
                  padding: "7%",
                  backgroundColor: "white",
                },
                children: [
                  {
                    type: "image",
                    styling: {
                      width: 42,
                      height: 42,
                      resizeMode: "contain",
                    },
                    url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/LanguageSelection/hi.png",
                  },
                  {
                    type: "container",
                    children: [
                      {
                        type: "title",
                        title: "Hindi",
                        styling: { fontSize: 18, marginLeft: 10 },
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
    language_selection: [
      {
        type: "card",
        children: [{ type: "title", title: "Hindi" }],
      },
    ],
  },
};
