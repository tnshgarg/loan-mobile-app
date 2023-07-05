import { useNavigation } from "@react-navigation/core";
import { Alert, BackHandler, SafeAreaView } from "react-native";

import { useEffect, useState } from "react";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { styles } from "../../styles";
import AadhaarVerifyTemplate from "../../templates/aadhaar/Verify";

const AadhaarVerify = () => {
  const navigation = useNavigation();
  const [back, setBack] = useState(false);

  
  const backAction = () => {
    if (back) {
      Alert.alert("OTP Timer", "You must wait for 10 minutes to resend OTP.");
    } else {
      Alert.alert(strings.holdOn, strings.goBackEditAadhaar, [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            trackEvent({
              interaction: InteractionTypes.SCREEN_OPEN,
              screen: "aadhaarOtp",
              action: "BACK",
            });
            navigation.navigate("AadhaarForm");
          },
        },
      ]);
    }
    return true;
  };

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "aadhaarOtp",
      action: "START",
    });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={strings.verifyAadhaar}
        onLeftIconPress={() => backAction()}
        subHeadline={
          "कृपया छ डिजिट का OTP यहाँ भरें। इसी के द्वारा ये स्पष्ट होगा की ऊपर भरा आधार नम्बर आपका है।"
        }
      />
      <AadhaarVerifyTemplate back={back} setBack={setBack} />
    </SafeAreaView>
  );
};

export default AadhaarVerify;
