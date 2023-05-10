import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import whatsappLinking from "../../helpers/WhatsappLinking";
import LogoHeader from "../atoms/LogoHeader";

const LogoHeaderBack = ({ leftOnPress, rightOnPress, title, skipEnabled }) => {
  return (
    <LogoHeader
      leftIcon={
        <Ionicons name="arrow-back-outline" size={28} color={COLORS.primary} />
      }
      leftOnPress={leftOnPress}
      title={title}
      rightIcon={
        skipEnabled ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.warning }}>Skip</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={COLORS.warning}
            />
          </View>
        ) : (
          <Ionicons name="logo-whatsapp" size={28} color={COLORS.primary} />
        )
      }
      rightOnPress={
        skipEnabled
          ? rightOnPress
          : () => {
              whatsappLinking();
            }
      }
    />
  );
};

export default LogoHeaderBack;
