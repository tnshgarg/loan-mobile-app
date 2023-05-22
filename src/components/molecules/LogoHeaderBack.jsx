import { View, Text, Linking } from "react-native";
import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import Help from "../../assets/Help.svg";
import SvgContainer from "../atoms/SvgContainer";

const LogoHeaderBack = ({
  onLeftIconPress,
  onRightIconPress,
  title,
  skipEnabled,
  headline,
  subHeadline,
  containerStyle,
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
      containerStyle={{ ...containerStyle }}
      leftOnPress={onLeftIconPress}
      title={title}
      headline={headline}
      subHeadline={subHeadline}
      rightIcon={
        onRightIconPress && (
          <SvgContainer height={42} width={42}>
            <Help />
          </SvgContainer>
        )
      }
      rightOnPress={onRightIconPress}
    />
  );
};

export default LogoHeaderBack;
