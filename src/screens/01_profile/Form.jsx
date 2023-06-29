import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import LogoHeader from "../../components/atoms/LogoHeader";
import { strings } from "../../helpers/Localization";
import { navigate } from "../../navigators/RootNavigation";
import { styles } from "../../styles";
import ProfileFormTemplate from "../../templates/profile/Form";

const ProfileForm = () => {
  const navigation = useNavigation();

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => navigate("EWAStack", { screen: "EWA_OFFER" }),
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
