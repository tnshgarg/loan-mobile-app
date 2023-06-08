import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import SvgContainer from "../atoms/SvgContainer";
import BannerBg from "../../assets/BannerBg.svg";
import LinearGradient from "react-native-linear-gradient";

const CmsColumn = ({ children, title, subtitle }) => {
  const safeChildren = children || [];
  console.log({ safeChildren });
  return (
    <View style={styles.row}>
      {safeChildren.map((child, index) => (
        <View key={index} style={styles.col}>
          {child.element(child)}
        </View>
      ))}

      <View style={[styles.col, { paddingLeft: 10 }]}>
        <Text style={{ ...FONTS.body2, color: COLORS.black }}>{title}</Text>
        <Text style={{ ...FONTS.body3, color: COLORS.black }}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: COLORS.lightGray,
    borderRadius: "10rem",
    padding: "15rem",
  },

  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-10%",
    backgroundColor: COLORS.cardBackground,
    padding: "15rem",
    borderRadius: "10rem",
    marginTop: "10rem",
  },
  col: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
  },
});

export default CmsColumn;
