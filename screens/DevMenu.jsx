import { View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/DevMenuButton";
import PushNotification from "react-native-push-notification";
import { useEffect } from "react";

export default DevMenu = () => {
  const navigation = useNavigation();
  const screens = [
    { title: "Welcome", name: "Welcome" },
    { title: "Login", name: "Login" },
    { title: "AADHAAR", name: "AadhaarForm" },
    { title: "PAN", name: "PanForm" },
    { title: "BANK", name: "BankForm" },
    { title: "Mandate", name: "Mandate" },
    { title: "Profile", name: "PersonalDetailsForm" },
    { title: "Photo", name: "PersonalImage" },
    { title: "Home", name: "Home" },
    { title: "KYC Details", name: "KYC" },
    { title: "Profile Details", name: "Profile" },
    { title: "EWA", name: "EWA_OFFER" },
  ];

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: "test-channel",
      channelName: "Test Channel",
    });
  };

  useEffect(() => {
    createChannels();
  });

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: "test-channel",
      title: "hello",
      message: "Hi This is Unipe App",
      bigText: "You can now avail your EWA worth 30,000 rupees",
    });
  };

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
        <DevMenuButton
          style={{ marginTop: 20 }}
          title={"Notification Test"}
          onPress={() => handleNotification()}
        />
      </View>
    </ScrollView>
  );
};
