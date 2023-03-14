import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";

const InfoCard = ({ info }) => {
  return (
    <View accessibilityLabel="InfoCard" style={styles.container}>
      <MaterialCommunityIcons
        name="information-outline"
        size={20}
        color={COLORS.primary}
      />
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    //backgroundColor: COLORS.primaryBackground,
    width: "100%",
    marginVertical: "20rem",
    // padding: "10rem",
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  text: { paddingLeft: "10rem", ...FONTS.body5, color: COLORS.gray, flex: 1 },
});

export default InfoCard;
