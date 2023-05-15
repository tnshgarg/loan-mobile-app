import { View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/atoms/DevMenuButton";

export default DevMenu = () => {
  const navigation = useNavigation();

  const screens = [
    { title: "Login", stack: "OnboardingStack", name: "Login" },
    { title: "Login Success", stack: "OnboardingStack", name: "LoginSuccess" },
    { title: "Profile", stack: "EWAStack", name: "EWA_KYC_STACK" },
    { title: "AADHAAR", stack: "EWAStack", name: "EWA_KYC_STACK" },
    { title: "PAN", stack: "EWAStack", name: "EWA_KYC_STACK" },
    { title: "BANK", stack: "EWAStack", name: "EWA_KYC_STACK" },
    { title: "Mandate", stack: "EWAStack", name: "EWA_MANDATE" },
    { title: "Home", stack: "HomeStack", name: "Home" },
    { title: "KYC Details", stack: "AccountStack", name: "KYC" },
    { title: "Profile Details", stack: "AccountStack", name: "Profile" },
    { title: "Documents", stack: "AccountStack", name: "Documents" },
    { title: "EWA", stack: "EWAStack", name: "EWA_OFFER" },
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
                navigation.navigate(screen.stack, { screen: screen.name })
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
