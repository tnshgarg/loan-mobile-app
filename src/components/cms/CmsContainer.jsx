import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsContainer = ({ children, title, styling }) => {
  const safeChildren = children || [];
  return (
    <View style={[styles.container, { ...styling }]}>
      {safeChildren?.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    flexDirection: "column",
    padding: "15rem",
  },
});

export default CmsContainer;
