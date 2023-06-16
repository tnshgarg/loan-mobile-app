import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import * as RootNavigation from "../../navigators/RootNavigation";

const CmsCard = ({ children, style, gradientColors }) => {
  const safeChildren = children || [];
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => RootNavigation.navigate("CmsScreen")}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors ?? ["#d6f3af", "#eaf98c"]}
        style={[styles.container, { ...style }]}
      >
        {safeChildren?.map((child, index) => (
          <View key={index} style={styles.col}>
            {child.element(child)}
          </View>
        ))}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "5rem",
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10rem",
  },
  title: { ...FONTS.h3, color: COLORS.black },
  subtitle: { ...FONTS.body4, color: COLORS.black, marginTop: "5rem" },
  description: { ...FONTS.body5, color: COLORS.black, marginLeft: "5rem" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: "10rem",
  },
});

export default CmsCard;
