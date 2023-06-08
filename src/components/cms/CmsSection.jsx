import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CmsSection = ({
  title,
  leftIcon,
  rightIcon,
  subtitle,
  ctaText,
  onPressCta,
  children,
  cmsTypes,
}) => {
  const safeChildren = children || [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: leftIcon }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        {ctaText && (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.7}
            onPress={onPressCta}
          >
            <Text style={styles.ctaText}>{ctaText}</Text>
            <MaterialCommunityIcons
              name="chevron-right-circle"
              color={COLORS.primary}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>

      {safeChildren.map((child, index) => (
        <View key={index}>{child.element(child)}</View>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    paddingVertical: "15rem",
    marginTop: "10rem",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
