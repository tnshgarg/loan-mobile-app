import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";

const MandateOptions = ({ ProceedButton }) => {
  const mandateOptions = [
    {
      title: "Debit Card",
      iconName: "credit-card-outline",
      onPress: () => ProceedButton({ authType: "debitcard" }),
    },
    {
      title: "Net Banking",
      iconName: "bank-outline",
      onPress: () => ProceedButton({ authType: "netbanking" }),
    },
  ];

  return (
    <View style={styles.container}>
      {mandateOptions.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLORS.lightgray_01,
    elevation: 2,
    backgroundColor: COLORS.white,
    margin: 1,
  },
});

export default MandateOptions;
