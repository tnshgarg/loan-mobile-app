import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../../../../helpers/CmsNavigationHelper";
import { strings } from "../../../../helpers/Localization";
import { styles } from "../../../../styles";
import MandateFormTemplate from "../../../../templates/mandate/Form";

const Mandate = (props) => {
  const navigation = useNavigation();
  const mandateVerifyStatus = useSelector(
    (state) => state.mandate.verifyStatus
  );

  const { previousScreen } = props.route.params;
  console.log({ previousScreen });

  const backAction = () => {
    setAlertVisible(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    if (mandateVerifyStatus === "SUCCESS") {
      // if(previousScreen == 'HomeStack'){

      // }
      navigation.navigate("EWA_OFFER");
    }
  }, [mandateVerifyStatus]);

  const [alertVisible, setAlertVisible] = useState(false);

  const alertData = {
    title: "Wait! One last step",
    subtitle:
      "Add your mandate details to withdraw advance salary in our bank account",

    imageUri:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
    primaryBtnText: "+ Add Repayment Method",
    onPressPrimaryBtn: () => {
      setAlertVisible(false);
    },
    secondaryBtnText: "I will do it later",
    infoText: "",
    contentContainerStyle: { flexDirection: "column-reverse" },
    onPressSecondaryBtn: () => {
      setAlertVisible(false);
      navigation.navigate("HomeStack");
    },
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={strings.addRepaymentMethod}
        onLeftIconPress={() => backAction()}
        subHeadline={
          "एडवांस सैलरी का भुगतान करने के लिए, कृपया निम्नलिखित भुगतान विधियों में से एक का चयन करें:"
        }
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "mandate_help" },
          })
        }
      />

      {alertVisible && (
        <BottomAlert
          visible={alertVisible}
          setVisible={setAlertVisible}
          data={alertData}
        />
      )}

      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;
