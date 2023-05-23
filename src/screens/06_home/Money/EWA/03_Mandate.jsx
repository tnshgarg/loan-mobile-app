import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BackHandler, SafeAreaView } from "react-native";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import { styles } from "../../../../styles";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";

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
      <LogoHeaderBack
        headline={"Add Repayment Method"}
        onLeftIconPress={() => backAction()}
        subHeadline={
          "एडवांस सैलरी का भुगतान करने के लिए, कृपया निम्नलिखित भुगतान विधियों में से एक का चयन करें:"
        }
      />

      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;
