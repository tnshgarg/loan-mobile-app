import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import SvgContainer from "../atoms/SvgContainer";
import BannerBg from "../../assets/BannerBg.svg";
import LinearGradient from "react-native-linear-gradient";
import Star from "../../assets/Star.svg";

const CmsReview = ({ children, testimony, name, address, stars }) => {
  const safeChildren = children || [];
  console.log({ safeChildren });
  return (
    <View style={styles.col}>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <SvgContainer height={16} width={16}>
          <Star />
        </SvgContainer>
        <View style={{ marginHorizontal: 3 }} />
        <SvgContainer height={16} width={16}>
          <Star />
        </SvgContainer>
        <View style={{ marginHorizontal: 3 }} />
        <SvgContainer height={16} width={16}>
          <Star />
        </SvgContainer>
        <View style={{ marginHorizontal: 3 }} />
        <SvgContainer height={16} width={16}>
          <Star />
        </SvgContainer>
        <View style={{ marginHorizontal: 3 }} />
        <SvgContainer height={16} width={16}>
          <Star />
        </SvgContainer>
      </View>
      <Text style={{ ...FONTS.body3, marginVertical: 10 }}>{testimony}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          }}
          style={{ height: 36, width: 36, borderRadius: 50, marginRight: 15 }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ ...FONTS.body5, color: COLORS.black }}>{name}</Text>
          <Text style={{ ...FONTS.body5, color: COLORS.black }}>{address}</Text>
        </View>
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
    backgroundColor: COLORS.lightGray,
    padding: "15rem",
    borderRadius: "10rem",
    marginTop: "10rem",
  },
  col: {
    flexDirection: "column",
    // alignItems: "flex-start",
    width: "100%",
    padding: "10rem",
  },
});

export default CmsReview;
