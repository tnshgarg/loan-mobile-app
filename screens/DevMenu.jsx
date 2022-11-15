import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/atoms/DevMenuButton";
import PushNotification, { Importance } from "react-native-push-notification";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

export default DevMenu = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // PushNotification.subscribeToTopic("Onboarding");
    // messaging()
    //   .sendMessage({
    //     to: "Onboarding",
    //     notification: {
    //       title: "Complete your Onboarding Journey",
    //       body: "Complete your Onboarding Process to avail your Salary in Advance",
    //     },
    //   })
    //   .then((response) => console.log("Successful notification: ", response))
    //   .catch(console.log);
    PushNotification.createChannel(
      {
        channelId: "Onboarding", // (required)
        channelName: "OnboardingChannel", // (required)
        channelDescription:
          "A channel for users who have not completed Onboarding Journey", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotificationSchedule({
      title: "Complete Your Onboarding Steps",
      message: "Complete Your Onboarding Journey to avail your Advanced Salary",
      date: new Date(Date.now() + 10 * 1000), // {10 seconds}
      allowWhileIdle: false,
      channelId: "Onboarding",
      repeatTime: 1,
    });
  }, []);
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
