import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import Header from "../../components/atoms/Header";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { styles } from "../../styles";
import ProfileFormTemplate from "../../templates/profile/Form";

const ProfileForm = () => {
  const navigation = useNavigation();

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => navigation.navigate("EWAStack", { screen: "EWA_OFFER" }),
      },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="ProfileForm">
      <Header
        title="Onboarding"
        onLeftIconPress={() => backAction()}
        progress={20}
      />
      <OnboardingProgressBar step={0} />
      <ProfileFormTemplate type="Onboarding"/>
    </SafeAreaView>
  );
};

export default ProfileForm;
