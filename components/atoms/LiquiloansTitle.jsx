import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const LiquiloansTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Powered by</Text>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../../assets/LiquiLoansLogo.jpg")}
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
    height: "40rem",
    width: "40rem",
    marginRight: "5rem",
  },
});

export default LiquiloansTitle;
