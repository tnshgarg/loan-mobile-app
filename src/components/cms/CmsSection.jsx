import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";

const CmsSection = ({
  title,
  leftIcon,
  rightIcon,
  subtitle,
  ctaText,
  onPressCta,
  children,
  cmsTypes,
  ctaRoute,
  gradientColors,
  styling,
}) => {
  const safeChildren = children || [];
  const navigation = useNavigation();

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
            onPress={() => navigation.navigate("LearnWithUs")}
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
