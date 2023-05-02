import { View, Text, Linking } from "react-native";
import React from "react";
import LogoHeader from "../atoms/LogoHeader";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";

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
          <Ionicons
            name="logo-whatsapp"
            size={28}
            color={COLORS.primary}
          />
        )
      }
      rightOnPress={
        skipEnabled
          ? rightOnPress
          : () => {
              Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
            }
      }
    />
  );
};

export default LogoHeaderBack;
