import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogoImage from "../../assets/HeaderLogo.svg";
import { COLORS, FONTS } from "../../constants/Theme";
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
  hideLogo,
  headerImageUri,
}) => {
  const EmptyView = () => {
    return <View style={styles.empty} />;
  };

  return (
    <View style={[styles.mainContainer]}>
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
          ) : !hideLogo ? (
            <SvgContainer width={95} height={35}>
              <LogoImage />
            </SvgContainer>
          ) : (
            <></>
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
      {headline || subHeadline || headerImageUri ? (
        <View style={styles.contentContainer}>
          <View style={styles.column}>
            {headline && <Text style={styles.headline}>{headline}</Text>}
            {subHeadline && (
              <Text style={styles.subHeadline}>{subHeadline}</Text>
            )}
          </View>

          {headerImageUri ? (
            <Image
              style={styles.headerImage}
              source={{
                uri: headerImageUri,
              }}
            />
          ) : (
            <></>
          )}
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerBg,
    padding: "15rem",
  },
  headerImage: {
    width: "100rem",
    height: "100rem",
    resizeMode: "contain",
  },

  column: {
    flexDirection: "column",
    alignItems: "flex-start",
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
