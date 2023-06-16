import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CmsIcon = ({ iconName, iconSize, iconColor }) => {
  return (
    <MaterialCommunityIcons
      name={iconName}
      size={iconSize}
      color={COLORS.gray}
    />
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3rem",
  },
});

export default CmsIcon;
