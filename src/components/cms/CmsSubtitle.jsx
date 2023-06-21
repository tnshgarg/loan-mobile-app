import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsSubtitle = ({ children, title, styling }) => {
  const safeChildren = children || [];
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.body4, color: COLORS.black, ...styling }}>
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
    marginVertical: "3rem",
  },
});

export default CmsSubtitle;
