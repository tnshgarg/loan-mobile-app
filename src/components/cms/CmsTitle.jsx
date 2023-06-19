import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsTitle = ({ children, title, styling }) => {
  const safeChildren = children || [];
  console.log("Cms Title", title);
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h3, color: COLORS.black, ...styling }}>
        {title}
      </Text>
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

export default CmsTitle;
