import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import MandateFormTemplate from "../../templates/mandate/Form";
import Header from "../../components/atoms/Header";

const Mandate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("Mandate"));
  }, []);

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "If you go back your Bank Verification will have to be redone. Continue only if you want to edit your Bank Account Details.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankConfirm") },
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
        title="Mandate Confirmation"
        onLeftIconPress={() => backAction()}
      />
      <OnboardingProgressBar step={4} />
      <MandateFormTemplate type="Onboarding" />
    </SafeAreaView>
  );
};

export default Mandate;
