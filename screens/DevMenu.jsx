import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/DevMenuButton";
import PushNotification from "react-native-push-notification";
import { useEffect } from "react";

export default DevMenu = () => {
  const navigation = useNavigation();
  const screens = [
    { title: "Welcome", stack: "OnboardingStack", name: "Welcome" },
    { title: "Login", stack: "OnboardingStack", name: "Login" },
    { title: "Profile", stack: "OnboardingStack", name: "ProfileForm" },
    { title: "Photo", stack: "OnboardingStack", name: "PersonalImage" },
    { title: "AADHAAR", stack: "OnboardingStack", name: "AadhaarForm" },
    { title: "PAN", stack: "OnboardingStack", name: "PanForm" },
    { title: "BANK", stack: "OnboardingStack", name: "BankForm" },
    { title: "Mandate", stack: "OnboardingStack", name: "Mandate" },
    { title: "Home", stack: "HomeStack", name: "Home" },
    { title: "KYC Details", stack: "HomeStack", name: "KYC" },
    { title: "Profile Details", stack: "HomeStack", name: "Profile" },
    { title: "EWA", stack: "EWAStack", name: "EWA_OFFER" },
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, index) => (
          <DevMenuButton
            key={index}
            style={{ marginTop: 20 }}
            title={screen.title}
            onPress={() =>
              navigation.navigate(screen.stack, { screen: screen.name })
            }
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
