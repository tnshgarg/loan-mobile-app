import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
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

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Bank Verification will have to be redone. Continue only if you want to edit your Bank Account Details.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankForm") },
      ]
    );
  };

  useEffect(() => {
    const backAction = () => {
      backAlert();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.removeEventListener();
  }, []);
  
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Mandate Confirmation"
        onLeftIconPress={() => navigation.navigate("BankForm")}
      />
      <ProgressBarTop step={4} />
      <MandateFormTemplate type="Onboarding" />
    </SafeAreaView>
  );
};

export default Mandate;
