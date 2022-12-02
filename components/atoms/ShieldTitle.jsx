import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import Shield from "../../assets/Shield.svg";

const ShieldTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Shield style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    widht: "100%",
    marginVertical: "5rem",
  },
  title: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  image: {
    height: "15rem",
    width: "15rem",
    marginRight: "5rem",
  },
});

export default ShieldTitle;
