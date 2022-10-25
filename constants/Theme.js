import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primaryPending: "#4E46F1",
  primary: "#2CB77C",
  primaryBackground: "#D5F9EA",
  button: {
    disabled: {
      background: "",
      text: "",
    },
    disabled: {
      background: "",
      text: "",
    },
  },
  appBar: {
    background: "#2CB77C",
    text: "",
  },
  secondary: "#230C45",
  warning: "#f56a6a",
  warningBackground: "#feedee",
  darkGray: "#333333",
  gray: "#808080",
  lightGray: "#aaaaaa",
  black: "#000000",
  white: "#FFFFFF",
  lightgray_01: "#f1f1f1",
};

export const SIZES = {
  // global sizes
  margin: 10,
  iconSize: 24,
  radius: 5,
  padding: 15,
  opacity: 0.7,

  // font sizes
  h1: 30,
  h2: 24,
  h3: 18,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 24,
  body3: 18,
  body4: 14,
  body5: 10,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  h1: { fontFamily: "Roboto-Medium", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Medium", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Medium", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Medium", fontSize: SIZES.h4, lineHeight: 18 },
  h5: { fontFamily: "Roboto-Medium", fontSize: SIZES.h5, lineHeight: 14 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 18,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 14,
  },
};

const Theme = { COLORS, SIZES, FONTS };

export default Theme;
