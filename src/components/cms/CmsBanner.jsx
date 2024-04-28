import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";

const CmsBanner = ({ children, colors, styling }) => {
  const safeChildren = children || [];
  return (
    <LinearGradient
      style={[styles.container, { ...styling }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colors ?? ["#d5f2b2", "#ebfa8d"]}
    >
      {safeChildren?.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </LinearGradient>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD44F",
    borderRadius: "10rem",
    // padding: "10rem",
    // margin: "15rem",
    overflow: "hidden",
  },
});

export default CmsBanner;
