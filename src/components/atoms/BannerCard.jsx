import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import LinearGradient from "react-native-linear-gradient";
import Blog1 from "../../assets/Blog1.svg";
import SvgContainer from "./SvgContainer";

const BannerCard = ({ text }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#d6f3af", "#eaf98c"]}
      style={styles.container}
    >
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={styles.text}>
          What are the benefits of completing KYC?
        </Text>
      </View>
      <SvgContainer width={90} height={90}>
        <Blog1 />
      </SvgContainer>
    </LinearGradient>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "15rem",
    padding: "10rem",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  text: { paddingLeft: "10rem", ...FONTS.body3, color: COLORS.black },
});

export default BannerCard;
