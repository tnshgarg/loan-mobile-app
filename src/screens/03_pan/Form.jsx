import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/atoms/Header";
import { strings } from "../../helpers/Localization";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import PanFormTemplate from "../../templates/pan/Form";

export default PanForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const aadhaarVerifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const backAction = () => {
    Alert.alert(strings.holdOn, strings.goBackAadhaarVerification, [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          aadhaarVerifyStatus === "SUCCESS"
            ? navigation.navigate("AadhaarConfirm")
            : navigation.navigate("AadhaarForm");
        },
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
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Onboarding"
        onLeftIconPress={() => backAction()}
        progress={40}
      />
      <OnboardingProgressBar step={2} />
      <PanFormTemplate />
    </SafeAreaView>
  );
};
