import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Markdown from "react-native-markdown-display";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsCollapsibleList = ({
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  navigate,
}) => {
  const [show, setShow] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => (navigate ? navigationHelper(navigate) : setShow(!show))}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { ...titleStyle }]}>{title}</Text>
          {show && <Markdown style={markDownStyles}>{subtitle}</Markdown>}
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

const markDownStyles = StyleSheet.create({
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: COLORS.gray,
    ...FONTS.body4,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    color: COLORS.gray,
    ...FONTS.body4,
  },
});

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
