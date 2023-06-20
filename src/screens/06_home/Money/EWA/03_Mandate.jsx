import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BackHandler, SafeAreaView } from "react-native";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import { styles } from "../../../../styles";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import HelpSection from "../../../../components/organisms/HelpSection";
import { useState } from "react";
import { navigationHelper } from "../../../../helpers/CmsNavigationHelper";

const Mandate = () => {
  const mandateData = {
    heading: "Help - Mandate Verification",
    headingImage: require("../../../../assets/MandateHeader.png"),
    title: "Adding Repayment Method (Mandate)",
    subtitle: "Choose one of the methods to setup repayment.",
    btnText: "Add Mandate",
    badgeTitle: "OPTION",
    steps: [
      {
        title: "Debit Card",
        subtitle:
          "To complete Mandate with a debit card, provide your debit card details and OTP to authenticate your Mandate.",
      },
      {
        title: "Net Banking",
        subtitle:
          "To complete Mandate with a debit card, provide your debit card details and OTP to authenticate your Mandate.",
      },
      {
        title: "Aadhaar Card",
        subtitle:
          "To complete Mandate with a debit card, provide your debit card details and OTP to authenticate your Mandate.",
      },
    ],
    questions: [
      {
        title: "Q: Is it mandatory to add Repayment Method (Mandate)?",
        subtitle:
          "A: Yes. This is 100% secure and executed by an RBI approved entity.",
      },
      {
        title:
          "Q:  What happens in case of insufficient balance in the bank account for auto-debit?",
        subtitle:
          "A: The transaction will fail and may impose additional penalty charges.",
      },
      {
        title: "Q: What is the fastest way to register mandate?",
        subtitle: "A: Debit Card",
      },
      {
        title: "Q: How much time will Aadhaar Mandate take?",
        subtitle: "A: 4-5 Banking Days",
      },
    ],
  };
  const [visible, setVisible] = useState(false);
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
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "aadhaar_help" },
          })
        }
      />
      {visible && (
        <HelpSection
          visible={visible}
          setVisible={setVisible}
          data={mandateData}
        />
      )}

      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;
