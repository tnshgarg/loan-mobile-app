import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/atoms/DevMenuButton";

export default DevMenu = () => {
  const navigation = useNavigation();

  const screens = [
    { title: "Onboarding", stack: "OnboardingStack", name: "Onboarding" },
    { title: "Welcome", stack: "OnboardingStack", name: "Welcome" },
    { title: "Login", stack: "OnboardingStack", name: "Login" },
    { title: "Profile", stack: "OnboardingStack", name: "ProfileForm" },
    { title: "AADHAAR", stack: "OnboardingStack", name: "AadhaarForm" },
    { title: "PAN", stack: "OnboardingStack", name: "PanForm" },
    { title: "BANK", stack: "OnboardingStack", name: "BankForm" },
    { title: "Mandate", stack: "OnboardingStack", name: "Mandate" },
    { title: "Home", stack: "HomeStack", name: "DrawerHome" },
    // { title: "Home", stack: "DrawerNavigator", name: "DrawerHome" },
    { title: "KYC Details", stack: "AccountStack", name: "KYC" },
    { title: "Profile Details", stack: "AccountStack", name: "Profile" },
    { title: "EWA", stack: "EWAStack", name: "EWA_OFFER" },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, index) => (
          <DevMenuButton
            accessibilityLabel={screen.title}
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
        <DevMenuButton
          style={{ marginTop: 20 }}
          title={"Account"}
          onPress={() =>
            navigation.navigate("HomeStack", {
              screen: "DrawerHome",
              params: {
                screen: "Account",
              },
            })
          }
        />
        <DevMenuButton
          style={{ marginTop: 20 }}
          title={" Drawer Home"}
          onPress={() =>
            navigation.navigate("HomeStack", {
              screen: "DrawerHome",
              params: {
                screen: "Documents",
              },
            })
          }
        />
      </View>
    </ScrollView>
  );
};
