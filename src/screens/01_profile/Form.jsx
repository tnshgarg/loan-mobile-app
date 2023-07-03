import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import LogoHeader from "../../components/atoms/LogoHeader";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  setSessionValue,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { navigate } from "../../navigators/RootNavigation";
import { styles } from "../../styles";
import ProfileFormTemplate from "../../templates/profile/Form";

const ProfileForm = () => {
  useEffect(() => {
    setSessionValue("flow", "kyc");
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "kycStart",
            action: "BACK",
          });
          navigate("EWAStack", { screen: "EWA_OFFER" });
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "kycStart",
      action: "START",
    });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="ProfileForm">
      <LogoHeader
        headline={strings.enterYourDetails}
        subHeadline={
          "एडवांस सैलरी की प्रक्रिया जारी रखने के लिए, निम्नलिखित अनिवार्य जानकारी प्रदान करें:"
        }
      />
      <ProfileFormTemplate type="Onboarding" />
    </SafeAreaView>
  );
};

export default ProfileForm;
