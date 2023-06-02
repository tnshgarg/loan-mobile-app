import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsSection = ({
  title,
  leftIcon,
  rightIcon,
  subtitle,
  ctaText,
  children,
  cmsTypes,
}) => {
  const safeChildren = children || [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: leftIcon }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        {ctaText && <Text style={styles.ctaText}>SEE ALL</Text>}
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
  ctaText: { ...FONTS.body4, color: COLORS.primary },
});

export default CmsSection;
