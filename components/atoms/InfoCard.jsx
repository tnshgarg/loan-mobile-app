import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@react-native-material/core";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";

const InfoCard = ({ info }) => {
  return (
    <View style={styles.container}>
      <Icon name="info-outline" size={20} color={COLORS.primary} />
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    width: "100%",
    marginTop: 20,
    padding: 10,
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  text: { paddingLeft: 10, ...FONTS.body4, color: COLORS.black, flex: 1 },
});

export default InfoCard;
