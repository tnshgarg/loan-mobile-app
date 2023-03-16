import { View, Text, Linking, Alert } from "react-native";
import React from "react";
import { WHATSAPP_SUPPORT_NUMBER } from "@env";

const whatsappLinking = () => {
  const url = `whatsapp://send?text=&phone=${WHATSAPP_SUPPORT_NUMBER}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Alert", "WhatsApp is not installed");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

export default whatsappLinking;
