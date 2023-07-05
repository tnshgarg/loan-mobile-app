import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../styles";

import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import BottomAlert from "../../components/molecules/BottomAlert";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { navigate } from "../../navigators/RootNavigation";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

const AadhaarConfirm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);

  const backAction = () => {
    setAlertVisible(true);
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "aadhaarOk",
      action: "BACK",
    });
    return true;
  };

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "aadhaarOk",
      action: "START",
    });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const alertData = {
    title: "Wait! KYC is in progress",
    subtitle: "To get advance salary you must complete your KYC",

    imageUri:
      "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Help/Aadhaar/step3.png",
    primaryBtnText: "Continue KYC",
    onPressPrimaryBtn: () => {
      setAlertVisible(false);
    },
    secondaryBtnText: "I will do it later",
    infoText: "",
    contentContainerStyle: { flexDirection: "column-reverse" },
    onPressSecondaryBtn: () => {
      setAlertVisible(false);
      navigate("HomeStack", { screen: "Home" });
    },
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={strings.areTheseAadhaarDetails}
        onLeftIconPress={() => backAction()}
        subHeadline={
          "क्या ये स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?"
        }
      />
      {alertVisible && (
        <BottomAlert
          visible={alertVisible}
          setVisible={setAlertVisible}
          data={alertData}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        <AadhaarConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AadhaarConfirm;
