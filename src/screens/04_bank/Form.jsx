import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/atoms/Header";
import { strings } from "../../helpers/Localization";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";

const BankForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);

  useEffect(() => {
    dispatch(addCurrentScreen("BankForm"));
  }, []);

  const backAction = () => {
    Alert.alert(strings.holdOn, strings.goBackPanVerification, [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          panVerifyStatus === "SUCCESS"
            ? navigation.navigate("PanConfirm")
            : navigation.navigate("PanForm");
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
        progress={50}
      />
      <OnboardingProgressBar step={3} />
      <BankFormTemplate />
    </SafeAreaView>
  );
};

export default BankForm;
