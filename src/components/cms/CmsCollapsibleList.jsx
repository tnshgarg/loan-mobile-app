import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CmsCollapsibleList = ({ title, subtitle, titleStyle, subtitleStyle }) => {
  const [show, setShow] = useState(false);
  return (
    <TouchableOpacity onPress={() => setShow(!show)} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { ...titleStyle }]}>{title}</Text>
          {show && (
            <Text style={[styles.subtitle, { ...subtitleStyle }]}>
              {subtitle}
            </Text>
          )}
        </View>

        <MaterialCommunityIcons
          name={!show ? "chevron-down" : "chevron-up"}
          size={28}
          color={COLORS.gray}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    padding: "10rem",
    paddingHorizontal: "15rem",
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray_01,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    paddingRight: "20rem",
  },
  title: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  subtitle: { ...FONTS.body3, color: COLORS.gray, marginTop: "10rem" },
});

export default CmsCollapsibleList;
