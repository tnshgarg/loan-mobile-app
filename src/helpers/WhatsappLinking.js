import { View, Text, Linking, Alert } from "react-native";
import React from "react";

const whatsappLinking = () => {
  const url = "whatsapp://send?text=&phone=7483447528";
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Alert", "WhatsApp is not installed");
    }
  });
};

export default whatsappLinking;
