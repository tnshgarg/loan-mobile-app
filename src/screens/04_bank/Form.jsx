import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";
import Header from "../../components/atoms/Header";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpSection from "../../components/organisms/HelpSection";
import { useGetPanQuery } from "../../store/apiSlices/panApi";
import { strings } from "../../helpers/Localization";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const BankForm = () => {
  const bankData = {
    heading: "Help - Bank Account Verification",
    headingImage: require("../../assets/MandateHeader.png"),
    title: "How to verify Bank Account?",
    subtitle: "Follow this 2-step process",
    btnText: "Add Bank Account",
    steps: [
      {
        title: "Bank Account Details",
        subtitle:
          "Provide your Account Holder's Name, Account Number, IFSC Code",
      },
      {
        title: "Confirm Bank Account",
        subtitle: "Confirm your Account details - Name, Account Number & IFSC",
      },
    ],
    questions: [
      {
        title: "Q: Why do I need to add Bank Account?",
        subtitle:
          "A: Your advance salary money will be deposited in this account",
      },
      {
        title: "Q:  Is it mandatory to add my own Account?",
        subtitle: "A: Yes. You need to provide your own Bank Account.",
      },
      {
        title: "Q: Do I need to submit physical document of Bank Account?",
        subtitle:
          "A: No. Bank Account addition is a completely paperless process.",
      },
    ],
  };

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: panData } = useGetPanQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
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
            params: { blogKey: "AadhaarHelp" },
          })
        }
      />
      {visible && (
        <HelpSection
          visible={visible}
          setVisible={setVisible}
          data={bankData}
        />
      )}
      <BankFormTemplate />
    </SafeAreaView>
  );
};

export default BankForm;
