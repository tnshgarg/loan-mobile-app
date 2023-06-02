import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HelpFooterSvg from "../../assets/HelpFooter.svg";
import SvgContainer from "../atoms/SvgContainer";

const HelpFooter = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h3, color: COLORS.secondary }}>
        Still need help?
      </Text>
      <Text style={{ ...FONTS.body3, color: COLORS.secondary, marginTop: 10 }}>
        Have queries? please get in touch and we will be happy to help you
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 50,
          padding: 10,
          paddingHorizontal: 15,
          marginTop: 15,
          elevation: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            padding: 5,
            backgroundColor: "#00DB10",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="whatsapp"
            size={36}
            color={COLORS.white}
          />
        </View>

        <View style={{ flexDirection: "column", paddingLeft: 10 }}>
          <Text style={{ ...FONTS.body5, color: COLORS.gray }}>Need help?</Text>
          <Text style={{ ...FONTS.body4, color: "#00DB10" }}>
            Contact Support
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          // backgroundColor: COLORS.secondary,
          marginTop: "-20%",
        }}
      >
        <SvgContainer width={250} height={150}>
          <HelpFooterSvg />
        </SvgContainer>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: COLORS.headerBg,
    width: "100%",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default HelpFooter;
