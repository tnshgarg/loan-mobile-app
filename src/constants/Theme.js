import { Dimensions, PixelRatio, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const { width, height } = Dimensions.get("window");

const scale = width / 380;

EStyleSheet.build({
  $rem: scale,
  $primaryPending: "#4E46F1",
  $primary: "#41be89",
  $primaryBackground: "#DDE9E4",
  $appBarBackground: "#2CB77C",
  $appBarText: "",
  $secondary: "#230C45",
  $warning: "#f56a6a",
  $warningBackground: "#fde1e1",
  $darkGray: "#333333",
  $gray: "#808080",
  $lightGray: "#aaaaaa",
  $black: "#000000",
  $white: "#FFFFFF",
  $lightgray_01: "#f1f1f1",
});
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
export const COLORS = {
  primary: "#41be89",
  primaryBackground: "#e0f2ec",
  pendingBackground: "#fff1e3",
  secondary: "#030D4E",
  headerBg: "rgba(55, 116, 118,0.1)",
  warning: "#f56a6a",
  warningBackground: "#fde1e1",
  pending: "orange",
  darkGray: "#333333",
  gray: "#5E8290",
  lightGray: "#DDE5E5",
  black: "#000000",
  white: "#FFFFFF",
  lightgray_01: "#f1f1f1",
  cardBackground: "#F2F8F9",
  moneyCardBg: "#f5f9f9",
  moneyCardBgVariant: "#4D5162",
  yellow: "#F9C700",
  lightGreen: "rgba(110, 220, 133,0.3)",
  lightYellow: "rgba(237, 251, 139,0.3)",
};

export const SIZES = {
  // global sizes
  margin: 10,
  iconSize: 24,
  radius: 5,
  padding: 15,
  opacity: 0.7,
  btnHeight: normalize(50),
  shadow: {
    shadowColor: COLORS.gray,
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 3,
  },

  // font sizes
  h1: normalize(26),
  h2: normalize(21),
  h3: normalize(18),
  h4: normalize(15),
  h5: normalize(13),
  body1: normalize(26),
  body2: normalize(21),
  body3: normalize(18),
  body4: normalize(15),
  body5: normalize(13),

  // app dimensions
  width,
  height,
};

export const FONTS = {
  title: {
    fontFamily: "Proxima Nova Regular",
    fontSize: normalize(62),
    lineHeight: normalize(62),
  },
  h1: {
    fontFamily: "Proxima Nova Bold",
    fontSize: SIZES.h1,
    lineHeight: normalize(36),
  },
  h2: {
    fontFamily: "Proxima Nova Bold",
    fontSize: SIZES.h2,
    lineHeight: normalize(30),
  },
  h3: {
    fontFamily: "Proxima Nova Bold",
    fontSize: SIZES.h3,
    lineHeight: normalize(24),
  },
  h4: {
    fontFamily: "Proxima Nova Bold",
    fontSize: SIZES.h4,
    lineHeight: normalize(18),
  },
  h5: {
    fontFamily: "Proxima Nova Bold",
    fontSize: SIZES.h5,
    lineHeight: normalize(16),
  },
  body1: {
    fontFamily: "Proxima Nova Regular",
    fontSize: SIZES.body1,
    lineHeight: normalize(36),
  },
  body2: {
    fontFamily: "Proxima Nova Regular",
    fontSize: SIZES.body2,
    lineHeight: normalize(30),
  },
  body3: {
    fontFamily: "Proxima Nova Regular",
    fontSize: SIZES.body3,
    lineHeight: normalize(24),
  },
  body4: {
    fontFamily: "Proxima Nova Regular",
    fontSize: SIZES.body4,
    lineHeight: normalize(18),
  },
  body5: {
    fontFamily: "Proxima Nova Regular",
    fontSize: SIZES.body5,
    lineHeight: normalize(16),
  },
};

const Theme = { COLORS, SIZES, FONTS };

export default Theme;
