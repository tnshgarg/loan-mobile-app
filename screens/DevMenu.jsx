import { View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/DevMenuButton";

export default DevMenu = () => {
  const navigation = useNavigation();
  const screens = [
    { title: "Welcome", screen: "Welcome" },
    { title: "Login", screen: "Login" },
    { title: "Aadhaar", screen: "AadhaarForm" },
    { title: "PAN", screen: "PanForm" },
    { title: "Bank Details", screen: "BankInfoForm" },
    { title: "Profile", screen: "PersonalDetailsForm" },
    { title: "Personal Photo", screen: "PersonalImage" },
    { title: "Home", screen: "Home" },
    { title: "KYC Screens", screen: "KYC" },
    { title: "Profile Details Screen", screen: "Profile" },
  ];
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, index) => (
          <DevMenuButton
            key={index}
            style={{ marginTop: 20 }}
            title={screen.title}
            onPress={() => navigation.navigate(screen.screen)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
