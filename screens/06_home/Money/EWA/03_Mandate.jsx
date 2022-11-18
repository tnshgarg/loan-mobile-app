import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BackHandler, SafeAreaView } from "react-native";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import Header from "../../../../components/atoms/Header";
import { styles } from "../../../../styles";

const Mandate = () => {
  const navigation = useNavigation();

  const mandateSlice = useSelector((state) => state.mandate);
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);

  const backAction = () => {
    navigation.navigate("EWA_KYC");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    if (verifyStatus === "SUCCESS") {
      navigation.navigate("EWA_AGREEMENT");
    }
  }, [verifyStatus]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Mandate" onLeftIconPress={() => backAction()} />
      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;
