import React from "react";
import { Image, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const LoanProviderLogo = ({ title, url }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Powered by</Text>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: url || "" }}
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
    height: "60rem",
    width: "110rem",
    marginRight: "5rem",
  },
});

export default LoanProviderLogo;
