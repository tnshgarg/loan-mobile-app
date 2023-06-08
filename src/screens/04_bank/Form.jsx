import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";
import Header from "../../components/atoms/Header";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpSection from "../../components/organisms/HelpSection";

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

  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);

  useEffect(() => {
    dispatch(addCurrentScreen("BankForm"));
  }, []);

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "If you go back your PAN Verification will have to be redone. Continue only if you want to edit your PAN number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            panVerifyStatus === "SUCCESS"
              ? navigation.navigate("PanConfirm")
              : navigation.navigate("PanForm");
          },
        },
      ]
    );
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
        onRightIconPress={() => setVisible(true)}
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
