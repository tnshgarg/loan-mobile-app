import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Help from "../../assets/Help.svg";
import { COLORS } from "../../constants/Theme";
import LogoHeader from "../atoms/LogoHeader";
import SvgContainer from "../atoms/SvgContainer";

const LogoHeaderBack = ({
  onLeftIconPress,
  onRightIconPress,
  title,
  titleStyle,
  headline,
  subHeadline,
  containerStyle,
  hideLogo,
  headerImageUri,
}) => {
  return (
    <LogoHeader
      leftIcon={
        onLeftIconPress && (
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={COLORS.secondary}
          />
        )
      }
      containerStyle={{ ...containerStyle }}
      titleStyle={{ ...titleStyle }}
      headerImageUri={headerImageUri}
      hideLogo={hideLogo}
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
