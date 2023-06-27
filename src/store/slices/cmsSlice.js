import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      children: [
        {
          type: "swiper",
          urls: [
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/carousel_1.png",
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/carousel_1.png",
            "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/carousel_1.png",
          ],
        },
      ],
    },
    {
      type: "column",
      title: "Why Unipe?",
      subtitle: "Why Unipe?",
      children: [
        {
          type: "video",
          videoUri: "",
        },
      ],
    },
    {
      type: "column",
      title: "Why Unipe?",
      subtitle: "Why Unipe?",
      children: [
        {
          type: "video",
          videoUri: "",
        },
      ],
    },
    {
      type: "section",
      title: "User Story",
      leftIcon:
        "https://d22ss3ef1t9wna.cloudfront.net/mobile-app-assets/Userstory.png",
    },
  ],
};

const cmsSlice = createSlice({
  name: "cms",
  initialState: initialState,
  reducers: {
    setState: (_, action) => action?.payload,
    updateState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setState: cmsFullUpdate, updateState: cmsPartialUpdate } =
  cmsSlice.actions;

export default cmsSlice.reducer;
