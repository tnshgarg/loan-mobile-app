import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FONTS } from "../../constants/Theme";

const CmsOverlay = ({ children, styling, visible }) => {
  const safeChildren = children || [];
  return visible ? (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[style.container, { ...styling }]}
    >
      {safeChildren?.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </TouchableOpacity>
  ) : (
    <></>
  );
};

export default CmsOverlay;

const style = EStyleSheet.create({
  container: {
    padding: "10rem",
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    width: "28rem",
    height: "28rem",
    resizeMode: "contain",
    paddingLeft: "5rem",
  },
  childContainer: {
    paddingLeft: "15rem",
  },
  title: {
    color: "white",
    ...FONTS.h3,
  },
  cta: {
    color: "#CBD987",
    ...FONTS.body5,
    paddingTop: "2rem",
  },
});
