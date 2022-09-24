import { View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/DevMenuButton";

export default DevMenu = () => {
  const navigation = useNavigation();
  const screens = [
    { title: "Welcome", name: "Welcome" },
    { title: "Login", name: "Login" },
    { title: "AADHAAR", name: "AadhaarForm" },
    { title: "PAN", name: "PanForm" },
    { title: "Bank", name: "BankForm" },
    { title: "Mandate", name: "Mandate" },
    { title: "Profile", name: "PersonalDetailsForm" },
    { title: "Photo", name: "PersonalImage" },
    { title: "Home", name: "Home" },
    { title: "KYC Details", name: "KYC" },
    { title: "Profile Details", name: "Profile" },
    { title: "EWA", name: "EWAOffer" },
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, index) => (
          <DevMenuButton
            key={index}
            style={{ marginTop: 20 }}
            title={screen.title}
            onPress={() => navigation.navigate(screen.name)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
