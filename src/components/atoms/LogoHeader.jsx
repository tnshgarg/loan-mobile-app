import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LogoImage from "../../assets/HeaderLogo.svg";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  InteractionTypes,
  trackEvent
} from "../../helpers/analytics/commonAnalytics";
import { navigate } from "../../navigators/RootNavigation";
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
  unreadNotifications,
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
              style={{ ...FONTS.h2, color: COLORS.secondary, ...titleStyle }}
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
            activeOpacity={0.7}
            onPress={() => {
              trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                screen: "home",
                action: "NOTIFICATION",
              });
              navigate("AccountStack", {
                screen: "NotificationView",
              });
            }}
          >
            <Image
              source={{
                uri: `https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-07-06/circleIcons/${
                  unreadNotifications ? "UnreadNotifs" : "Notif"
                }.png`,
              }}
              style={{ height: 36, width: 36, marginRight: 15 }}
            />
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
    padding: "20rem",
    paddingTop: "5rem",
    borderBottomLeftRadius: "15rem",
    borderBottomRightRadius: "15rem",
  },
  headerImage: {
    width: "100rem",
    height: "100rem",
    resizeMode: "contain",
    borderRadius: "10rem",
  },

  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  empty: { backgroundColor: "transparent", height: "32rem", width: "32rem" },
  logo: {
    height: "20rem",
    width: "30rem",
  },
  headline: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  subHeadline: {
    ...FONTS.body4,
    color: COLORS.secondary,
    marginTop: "5rem",
    width: "80%",
  },
});
