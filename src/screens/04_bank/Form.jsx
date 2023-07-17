import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent
} from "../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";

const BankForm = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });
  const { pan: panData } = kycData ?? {};
  const { verifyStatus } = panData ?? {};

  useEffect(() => {
    dispatch(addCurrentScreen("BankForm"));
  }, []);

  const backAction = () => {
    Alert.alert(strings.holdOn, strings.goBackPanVerification, [
      { text: "No", onPress: () => null, style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "bank",
            action: "BACK",
          });
          verifyStatus === "SUCCESS"
            ? navigation.navigate("HomeStack", {
              screen: "Home",
            })
            : navigation.navigate("PanForm");
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "bank",
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
        headline={strings.addBankAccount}
        onLeftIconPress={() => backAction()}
        subHeadline={"आपको इस बैंक खाते/यूपीआई में एडवांस सैलरी भेजी जाएगी।"}
        onRightIconPress={() => {
          trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "bank",
            action: "HELP",
          });
          navigationHelper({
            type: "cms",
            params: {
              blogKey: "bank_help"
            },
          });
        }}
      />

      <BankFormTemplate />
    </SafeAreaView>
  );
};

export default BankForm;
