import { Alert, Linking } from "react-native";

const whatsappLinking = () => {
  const url = `whatsapp://send?text=&phone=7483447528`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Alert", "WhatsApp is not installed");
      }
    })
    .catch((err) => console.log("An error occurred", err));
};

export default whatsappLinking;
