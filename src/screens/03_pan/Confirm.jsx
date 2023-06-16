import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { styles } from "../../styles";

import PanConfirmApi from "../../apis/pan/Confirm";
import Header from "../../components/atoms/Header";
import { strings } from "../../helpers/Localization";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

export default PanConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanConfirm"));
  }, []);

  const backAction = () => {
    Alert.alert(strings.goBack, strings.goBackPanVerification, [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("PanForm") },
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
        progress={40}
      />
      <OnboardingProgressBar step={2} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <PanConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};
