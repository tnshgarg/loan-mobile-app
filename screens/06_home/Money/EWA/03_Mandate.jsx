import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import OnboardingProgressBar from "../../../../navigators/OnboardingProgressBar";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import Header from "../../../../components/atoms/Header";
import { styles } from "../../../../styles";

const Mandate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const backAction = () => {
    navigation.navigate("EWA_KYC");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Mandate"
        onLeftIconPress={() => backAction()}
      />
      <OnboardingProgressBar step={4} />
      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;
