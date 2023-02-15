import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BackHandler, SafeAreaView } from "react-native";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import Header from "../../../../components/atoms/Header";
import { styles } from "../../../../styles";

const Mandate = () => {
  const navigation = useNavigation();
  const mandateVerifyStatus = useSelector(
    (state) => state.mandate.verifyStatus
  );

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
    if (mandateVerifyStatus === "SUCCESS") {
      navigation.navigate("EWA_AGREEMENT");
    }
  }, [mandateVerifyStatus]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Mandate"
        onLeftIconPress={() => backAction()}
        progress={75}
      />

      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;
