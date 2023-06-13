import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import LogoImage from "../../assets/HeaderLogo.svg";
import EStyleSheet from "react-native-extended-stylesheet";
import SvgContainer from "./SvgContainer";

const LogoHeader = ({
  containerStyle,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  title,
  titleStyle,
  headline,
  subHeadline,
}) => {
  const EmptyView = () => {
    return <View style={styles.empty} />;
  };

  return (
    <View style={[styles.mainContainer, { ...containerStyle }]}>
      <View style={[styles.container]}>
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
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          {title ? (
            <Text
              style={{ ...FONTS.body2, color: COLORS.secondary, ...titleStyle }}
            >
              {title}
            </Text>
          ) : (
            <SvgContainer width={95} height={35}>
              <LogoImage />
            </SvgContainer>
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
      {headline || subHeadline ? (
        <View style={styles.belowContainer}>
          {headline && <Text style={styles.headline}>{headline}</Text>}
          {subHeadline && <Text style={styles.subHeadline}>{subHeadline}</Text>}
        </View>
      ) : null}
    </View>
  );
};

export default LogoHeader;

const styles = EStyleSheet.create({
  mainContainer: {
    flexDirection: "column",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: "20rem",
    paddingVertical: "10rem",
  },
  belowContainer: {
    backgroundColor: COLORS.headerBg,
    flexDirection: "column",
    paddingHorizontal: "20rem",
    paddingBottom: "10rem",

    alignItems: "flex-start",
    borderBottomLeftRadius: "10rem",
    borderBottomRightRadius: "10rem",
  },
  empty: { backgroundColor: "transparent", height: "32rem", width: "32rem" },
  logo: {
    height: "20rem",
    width: "30rem",
  },
  headline: {
    ...FONTS.body2,
    color: COLORS.secondary,
  },
  subHeadline: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginTop: "5rem",
    marginBottom: "10rem",
  },
});
