import {
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
  Linking,
} from "react-native";
import { onboardingStyles, styles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import KycDone from "../assets/KycDone.svg";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../store/slices/navigationSlice";
import SuccessContainer from "../components/organisms/SuccessContainer";
import LogoHeaderBack from "../components/molecules/LogoHeaderBack";
import HelpSection from "../components/organisms/HelpSection";

const KycSuccess = () => {
  const [visible, setVisible] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const mandateData = {
    heading: "Help - Mandate Verification",
    headingImage: require("../assets/MandateHeader.png"),
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

  useEffect(() => {
    dispatch(addCurrentScreen("kycSuccess"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Login") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const data = {
    title: "KYC done Successfully",
    subtitle: "As a last step please register your mandate information",
    imageUri: <KycDone />,
    primaryBtnText: "+ Add Repayment Method",
    onPressPrimaryBtn: () => {
      navigation.replace("EWAStack", { screen: "EWA_MANDATE" });
    },
    secondaryBtnText: "I will do it later",
    infoText: "",
    contentContainerStyle: { flexDirection: "column-reverse" },
    onPressSecondaryBtn: () => {
      navigation.navigate("HomeStack");
    },
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        containerStyle={{ backgroundColor: "#223240" }}
        hideLogo={true}
        onRightIconPress={() => {
          setVisible(true);
        }}
      />

      {visible && (
        <HelpSection
          visible={visible}
          setVisible={setVisible}
          data={mandateData}
        />
      )}
      <SuccessContainer data={data} />
    </SafeAreaView>
  );
};

export default KycSuccess;
