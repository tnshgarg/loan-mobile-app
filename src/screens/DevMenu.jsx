import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View } from "react-native";
import DevMenuButton from "../components/atoms/DevMenuButton";
import { navigationHelper } from "../helpers/CmsNavigationHelper";
import { navigate } from "../navigators/RootNavigation";

export default DevMenu = () => {
  const navigation = useNavigation();

  const screens = [
    { title: "Login", stack: "OnboardingStack", name: "Login" },
    { title: "Localization", stack: "OnboardingStack", name: "Localization" },
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
          <DevMenuButton
            style={{ marginTop: 20 }}
            title={"User Story"}
            onPress={() =>
              navigation.navigate("AccountStack", {
                screen: "SubmitFeedback",
              })
            }
          />
          {screens.map((screen, index) => (
            <DevMenuButton
              accessibilityLabel={screen.title}
              key={index}
              style={{ marginTop: 20 }}
              title={screen.title}
              onPress={() =>
                navigate(screen.stack, {
                  screen: screen.name,
                  params: screen.screen ? { screen: screen.screen } : null,
                })
              }
            />
          ))}

          <DevMenuButton
            style={{ marginTop: 20 }}
            title={"CmsTest"}
            onPress={() =>
              navigationHelper({
                type: "cms",
                params: { blogKey: "login_success" },
              })
            }
          />

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
            onPress={() => navigation.navigate("BackendSync")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
