import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogoImage from "../../assets/HeaderLogo.svg";
import NotificationFade from "../../assets/NotificationFade.svg";
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
  notificationIconPresent,
}) => {
  const navigation = useNavigation();
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
        {notificationIconPresent ? (
          <TouchableOpacity
            style={{ paddingTop: 5 }}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("AccountStack", {
                screen: "NotificationView",
              })
            }
          >
            <SvgContainer height={42} width={42}>
              <NotificationFade />
            </SvgContainer>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {rightIcon ? (
          <TouchableOpacity activeOpacity={0.7} onPress={rightOnPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <EmptyView />
        )}
      </View>
      <View
        style={[
          styles.cont,
          headline || subHeadline || headerImageUri
            ? { paddingBottom: 10 }
            : {},
        ]}
      >
        {headline || subHeadline ? (
          <View style={styles.belowContainer}>
            {headline && <Text style={styles.headline}>{headline}</Text>}
            {subHeadline && (
              <Text style={styles.subHeadline}>{subHeadline}</Text>
            )}
          </View>
        ) : null}
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
    </View>
  );
};

export default LogoHeader;

const styles = EStyleSheet.create({
  mainContainer: {
    flexDirection: "column",
  },
  cont: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerBg,
  },
  headerImage: {
    width: "120rem",
    height: "120rem",
    resizeMode: "contain",
    marginRight: "20rem",
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
    flexDirection: "column",
    paddingHorizontal: "20rem",
    paddingBottom: "10rem",

    alignItems: "flex-start",
    borderBottomLeftRadius: "10rem",
    borderBottomRightRadius: "10rem",
    flexDirection: "row",
    alignItems: "center",
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
