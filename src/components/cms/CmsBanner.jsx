import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import LinearGradient from "react-native-linear-gradient";

const CmsBanner = ({ children, colors }) => {
  const safeChildren = children || [];
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colors ?? ["rgba(185, 233, 136, 0.6)", "rgba(237, 251, 139,1)"]}
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
