import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import SvgContainer from "../atoms/SvgContainer";
import BannerBg from "../../assets/BannerBg.svg";
import LinearGradient from "react-native-linear-gradient";

const CmsBanner = ({ children }) => {
  const safeChildren = children || [];
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["rgba(185, 233, 136, 0.6)", "rgba(237, 251, 139,1)"]}
    >
      <SvgContainer height={200} width={300}>
        <BannerBg />
      </SvgContainer>
      <View style={styles.row}>
        <View style={styles.col}></View>
        <View style={styles.col}></View>
      </View>
      {safeChildren.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </LinearGradient>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#FFD44F",
    borderRadius: "10rem",
    padding: "15rem",
  },
  wrapper: { height: 200, marginVertical: "15rem" },
  image: {
    resizeMode: "contain",
    width: "98%",
    alignSelf: "center",
    borderRadius: "10rem",
    height: 150,
    // marginRight: "2rem",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-10%",
  },
  col: {
    backgroundColor: COLORS.white,
    width: "48%",
    height: 130,
    borderRadius: "5rem",
  },
});

export default CmsBanner;
