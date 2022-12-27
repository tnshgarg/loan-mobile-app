import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const LiquiloansTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/LiquiLoansLogo.jpeg")}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: "5rem",
  },
  title: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  image: {
    height: "35rem",
    width: "35rem",
    marginRight: "5rem",
  },
});

export default LiquiloansTitle;