import { View, Text } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../../constants/Theme";

const Badge = ({ text, containerStyle }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["rgba(110, 220, 133,0.3)", "rgba(237, 251, 139,0.3)"]}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        ...containerStyle,
      }}
    >
      <Text style={{ ...FONTS.h5 }}>{text}</Text>
    </LinearGradient>
  );
};

export default Badge;
