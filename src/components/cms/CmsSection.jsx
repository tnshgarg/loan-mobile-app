import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsSection = ({
  title,
  leftIcon,
  rightIcon,
  subtitle,
  ctaText,
  children,
  gradientColors,
  styling,
  navigate
}) => {
  const safeChildren = children || [];

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.row, { ...styling }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors || [COLORS.lightGreen, COLORS.lightYellow]}
      >
        {leftIcon ? (
          <Image source={{ uri: leftIcon }} style={styles.image} />
        ) : (
          <></>
        )}
        <Text style={styles.title}>{title}</Text>
        {ctaText && (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => navigationHelper(navigate)}
          >
            <Text style={styles.ctaText}>{ctaText}</Text>
            <MaterialCommunityIcons
              name="chevron-right-circle"
              color={COLORS.primary}
              size={16}
            />
          </TouchableOpacity>
        )}
      </LinearGradient>

      {safeChildren?.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15rem",
    marginBottom: "5rem",
  },
  image: {
    height: "24rem",
    width: "24rem",
    borderRadius: "5rem",
    marginRight: "10rem",
  },
  title: {
    ...FONTS.body3,
    color: COLORS.black,
    flex: 1,
  },
  ctaText: { ...FONTS.body4, color: COLORS.primary, marginRight: "3rem" },
});

export default CmsSection;
