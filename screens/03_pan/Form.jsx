import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { styles } from "../../styles";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";

export default PanForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const aadhaarVerifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const SkipPAN = () => {
    console.log("first");
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
        { text: "Yes", onPress: () => {
          aadhaarVerifyStatus === "SUCCESS"
                ? navigation.navigate("AadhaarConfirm")
                : navigation.navigate("AadhaarForm");
          }
        },
      ]
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        leftOnPress={backAction}
        rightOnPress={SkipPAN}
        skipEnabled={true}
      />
      <OnboardingProgressBar step={2} />
      <PanFormTemplate />
    </SafeAreaView>
  );
};
