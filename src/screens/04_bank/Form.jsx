import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { useGetPanQuery } from "../../store/apiSlices/panApi";
import { strings } from "../../helpers/Localization";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { CMS_POLLING_DURATION } from "../../services/constants";

const BankForm = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: panData } = useGetPanQuery(unipeEmployeeId, {
    pollingInterval: CMS_POLLING_DURATION,
  });
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
          verifyStatus === "SUCCESS"
            ? navigation.navigate("PanConfirm")
            : navigation.navigate("PanForm");
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={"Add Bank Account"}
        onLeftIconPress={() => backAction()}
        subHeadline={"आपको इस बैंक खाते/यूपीआई में एडवांस सैलरी भेजी जाएगी।"}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "bank_help" },
          })
        }
      />

      <BankFormTemplate />
    </SafeAreaView>
  );
};

export default BankForm;
