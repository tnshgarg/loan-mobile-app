import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CmsIconText = ({ title, styling, iconName, iconSize }) => {
  return (
    <View style={[styles.container, { ...styling }]}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={COLORS.gray}
      />
      <Text style={{ ...FONTS.body5, color: COLORS.gray, marginLeft: 5 }}>
        {title}
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3rem",
  },
});

export default CmsIconText;
