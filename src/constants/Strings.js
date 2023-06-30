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

export const DUMMY_RES = [
  {
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 1",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Aadhaar Number",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 2",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Aadhaar OTP",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 3",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Confirm Identity",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
              title:
                "Q: I don't know which mobile number is linked with Aadhaar",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 1",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Aadhaar Number",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 2",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Aadhaar OTP",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 3",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Confirm Identity",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
              title:
                "Q: I don't know which mobile number is linked with Aadhaar",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 1",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Aadhaar Number",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 2",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Aadhaar OTP",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
                  styling: {
                    marginRight: 15,
                  },
                  text: "Step 3",
                  type: "badge",
                },
                {
                  styling: {
                    fontSize: 18,
                  },
                  title: "Confirm Identity",
                  type: "title",
                },
              ],
              styling: {
                alignItems: "center",
                flexDirection: "row",
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
              title:
                "Q: I don't know which mobile number is linked with Aadhaar",
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
                    " e-Mandate registration ensures automatic deduction of repayment amount, avoiding interest charges due to delayed repayments.",
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
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
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
                      title: "Lorem Ipsum is simply dumm typesetting industry.",
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
              subtitle:
                "A: Unipe is an interest-free solution that allows them to withdraw their salary advance whenever they need it.",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: To get advance salary, follow these 5 simple steps: \n- Download and login to the Unipe App \n- Complete KYC verification by entering your Aadhar, Pan & Bank details \n- Enter the amount you want to withdraw \n- Set up repayment metho \nWithdraw your advance salary \n",
              title: "Q: How can I get advance salary from Unipe?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: The Unipe EWA program is interest free. However, we do charge a very small processing fee at the time of disbursement. If the Advance salary is paid back on time, there is no separate interest charged.",
              title:
                "Q: Does Unipe charge me any fees or interest on advance salary?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: The advance amount taken will be automatically deducted from your salary at the time of payroll processing.",
              title:
                "Q: If I take Rs.1000 today, when will I have to pay it back?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: Your data is 100% encrypted and stored securely and only shared with third parties post your consent.",
              title: "Q: Is my data protected?",
              type: "collapsibleList",
            },
          ],
          title: "Basic Questions",
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
                screen: "Profile",
                type: "account",
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
                screen: "Profile",
                type: "account",
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
                "A: Unipe is an interest-free solution that allows them to withdraw their salary advance whenever they need it.",
              title: "Q: What is Unipe?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: To get advance salary, follow these 5 simple steps: \n- Download and login to the Unipe App \n- Complete KYC verification by entering your Aadhar, Pan & Bank details \n- Enter the amount you want to withdraw \n- Set up repayment metho \nWithdraw your advance salary \n",
              title: "Q: How can I get advance salary from Unipe?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: The Unipe EWA program is interest free. However, we do charge a very small processing fee at the time of disbursement. If the Advance salary is paid back on time, there is no separate interest charged.",
              title:
                "Q: Does Unipe charge me any fees or interest on advance salary?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: The advance amount taken will be automatically deducted from your salary at the time of payroll processing.",
              title:
                "Q: If I take Rs.1000 today, when will I have to pay it back?",
              type: "collapsibleList",
            },
            {
              subtitle:
                "A: Your data is 100% encrypted and stored securely and only shared with third parties post your consent.",
              title: "Q: Is my data protected?",
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
                                title:
                                  "What are the benefits of completing KYC?",
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
                                title:
                                  "What are the benefits of Advance Salary?",
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
                        title:
                          "Lorem Ipsum is simply dumm typesetting industry.",
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
                        title:
                          "Lorem Ipsum is simply dumm typesetting industry.",
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
                title:
                  "As a last step please register your mandate information",
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
  },
];

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
  },
};
