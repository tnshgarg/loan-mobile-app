import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";
import Header from "../../components/atoms/Header";

export default PanForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const SkipPAN = () => {
    Alert.alert(
      "Skip PAN Verification",
      `If you want to receive advance salary, PAN KYC is required. Are you sure, you want to skip this step?`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankForm") },
      ]
    );
  };

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "If you go back your Aadhaar Verification will have to be redone. Continue only if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("AadhaarConfirm") },
      ]
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="PAN Verification"
        onLeftIconPress={() => backAction()}
        onRightIconPress={() => SkipPAN()}
      />
      <OnboardingProgressBar step={2} />
      <PanFormTemplate />
    </SafeAreaView>
  );
};
