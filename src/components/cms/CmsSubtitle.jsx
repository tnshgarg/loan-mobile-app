import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsSubtitle = ({ children, title, styling }) => {
  const safeChildren = children || [];
  console.log("Cms Title", title);
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.body4, color: COLORS.black }}>{title}</Text>
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
  },
});

export default CmsSubtitle;
