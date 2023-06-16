import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { styles } from "../../styles";

import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import Header from "../../components/atoms/Header";
import { strings } from "../../helpers/Localization";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

const AadhaarConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);

  const backAction = () => {
    Alert.alert(strings.holdOn, strings.goBackAadhaarVerification, [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("AadhaarForm") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Onboarding"
        onLeftIconPress={() => backAction()}
        progress={30}
      />
      <OnboardingProgressBar step={1} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <AadhaarConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AadhaarConfirm;
