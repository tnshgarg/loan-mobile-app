import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import LogoImage from "../../assets/HeaderLogo.svg";
import EStyleSheet from "react-native-extended-stylesheet";
import SvgContainer from "./SvgContainer";
import Help from "../../assets/Help.svg";

const HelpHeader = ({
  containerStyle,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  title,
  headline,
}) => {
  const EmptyView = () => {
    return <View style={styles.empty} />;
  };

  return (
    <View
      style={[
        styles.container,
        {
          ...containerStyle,
          alignItems: "flex-end",
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={rightOnPress}>
        <SvgContainer height={36} width={36}>
          <Help />
        </SvgContainer>
      </TouchableOpacity>
    </View>
  );
};

export default HelpHeader;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: null,
    flexDirection: "column",
  },
});
