import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "@react-native-material/core";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import * as Progress from "react-native-progress";

const GetMoneyCard = ({
  navigation,
  eligible,
  amount,
  progress,
  ewaAccessible,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here is your On-Demand Salary</Text>

      <Text style={[styles.text, { ...FONTS.h1 }]}>{amount}</Text>
      {/* <Progress.Bar
        progress={1 - progress}
        width={null}
        borderWidth={0}
        color={COLORS.primary}
        borderRadius={0}
        height={3}
      /> */}
      <View
        style={{
          width: "100%",
          borderWidth: 0.4,
          borderColor: COLORS.lightGray,
        }}
      />

      <PrimaryButton
        title={
          !ewaAccessible
            ? "Offer inactive"
            : !eligible
            ? "No Active Offer"
            : "Get Money Now"
        }
        disabled={!eligible || !ewaAccessible}
        onPress={() => {
          navigation.navigate("EWA_OFFER");
        }}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    padding: "15rem",
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.lightgray_01,
    borderRadius: 5,
  },
  text: { ...FONTS.h3, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;
