import { View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/atoms/DevMenuButton";

export default DevMenu = () => {
  const navigation = useNavigation();

  const screens = [
    { title: "Login", stack: "OnboardingStack", name: "Login" },
    { title: "Login Success", stack: "OnboardingStack", name: "LoginSuccess" },
    {
      title: "Profile",
      stack: "EWAStack",
      name: "EWA_KYC_STACK",
      screen: "ProfileForm",
    },
    {
      title: "Kyc Progress",
      stack: "KycProgress",
    },

    {
      title: "AADHAAR",
      stack: "EWAStack",
      name: "EWA_KYC_STACK",
      screen: "AadhaarForm",
    },
    {
      title: "PAN",
      stack: "EWAStack",
      name: "EWA_KYC_STACK",
      screen: "PanForm",
    },
    {
      title: "BANK",
      stack: "EWAStack",
      name: "EWA_KYC_STACK",
      screen: "BankForm",
    },
    {
      title: "Kyc Success",
      stack: "KycSuccess",
    },
    { title: "Mandate", stack: "EWAStack", name: "EWA_MANDATE" },
    { title: "Home", stack: "HomeStack", name: "Home" },
    { title: "KYC Details", stack: "AccountStack", name: "KYC" },
    { title: "Profile Details", stack: "AccountStack", name: "Profile" },
    { title: "Documents", stack: "AccountStack", name: "Documents" },
    { title: "EWA", stack: "HomeStack", name: "Money" },
  ];

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {screens.map((screen, index) => (
            <DevMenuButton
              accessibilityLabel={screen.title}
              key={index}
              style={{ marginTop: 20 }}
              title={screen.title}
              onPress={() =>
                navigation.navigate(screen.stack, {
                  screen: screen.name,
                  params: screen.screen ? { screen: screen.screen } : null,
                })
              }
            />
          ))}

          <DevMenuButton
            style={{ marginTop: 20 }}
            title={"Account"}
            onPress={() =>
              navigation.navigate("HomeStack", {
                screen: "Account",
              })
            }
          />
           <DevMenuButton
            style={{ marginTop: 20 }}
            title={"BackendSync"}
            onPress={() =>
              navigation.navigate("BackendSync")
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
