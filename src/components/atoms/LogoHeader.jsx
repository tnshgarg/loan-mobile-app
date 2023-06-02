import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import LogoImage from "../../assets/HeaderLogo.svg";
import EStyleSheet from "react-native-extended-stylesheet";

const LogoHeader = ({
  containerStyle,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  title,
}) => {
  const EmptyView = () => {
    return <View style={styles.empty} />;
  };

  return (
    <View style={[styles.container, { ...containerStyle }]}>
      {leftIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginRight: 10 }}
          onPress={leftOnPress}
        >
          {leftIcon}
        </TouchableOpacity>
      )}
      <View
        style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}
      >
        {title ? (
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>{title}</Text>
        ) : (
          <LogoImage style={styles.logo} />
        )}
      </View>
      {rightIcon ? (
        <TouchableOpacity activeOpacity={0.7} onPress={rightOnPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <EmptyView />
      )}
    </View>
  );
};

export default LogoHeader;

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10rem",
    paddingHorizontal: "15rem",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1.5,
    borderColor: COLORS.lightgray_01,
  },
  empty: { backgroundColor: "transparent", height: "32rem", width: "32rem" },
  logo: {
    height: "20rem",
    width: "30rem",
  },
});
