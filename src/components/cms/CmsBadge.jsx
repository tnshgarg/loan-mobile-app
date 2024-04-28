import { View, Text } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsBadge = ({ text, styling }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[COLORS.lightGreen, COLORS.lightYellow]}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        ...styling,
      }}
    >
      <Text style={{ ...FONTS.h5 }}>{text}</Text>
    </LinearGradient>
  );
};

export default CmsBadge;
