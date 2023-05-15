import { View, Text, Linking } from "react-native";
import React from "react";
import LogoHeader from "../atoms/LogoHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import Help from "../../assets/Help.svg";
import SvgContainer from "../atoms/SvgContainer";

const LogoHeaderBack = ({
  onLeftIconPress,
  rightOnPress,
  title,
  skipEnabled,
  headline,
  subHeadline,
}) => {
  return (
    <LogoHeader
      leftIcon={
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color={COLORS.secondary}
        />
      }
      leftOnPress={onLeftIconPress}
      title={title}
      headline={headline}
      subHeadline={subHeadline}
      rightIcon={
        <SvgContainer height={38} width={38}>
          <Help />
        </SvgContainer>
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
