import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import { styles } from "../../styles";
import Header from "../../components/atoms/Header";
import LogoHeader from "../../components/atoms/LogoHeader";

const AadhaarForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("ProfileForm") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="AadhaarForm">
      {/* <Header
        title="Onboarding"
        onLeftIconPress={() => backAction()}
        progress={30}
      /> */}
      <LogoHeader
        headline={" Aadhaar Verification"}
        subHeadline={
          "भारतीय रिजर्व बैंक के मानदंडों के अनुसार, आपको अपना आधार वेरीफाई करना अनिवार्य है।"
        }
      />
      {/* <OnboardingProgressBar step={1} /> */}
      <AadhaarFormTemplate />
    </SafeAreaView>
  );
};

export default AadhaarForm;
