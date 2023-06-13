import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import { styles } from "../../styles";
import Header from "../../components/atoms/Header";
import LogoHeader from "../../components/atoms/LogoHeader";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpSection from "../../components/organisms/HelpSection";

const AadhaarForm = () => {
  const aadhaarData = {
    heading: "Help - Aadhaar Verification",
    headingImage: require("../../assets/AadhaarHeader.png"),
    title: "How to verify Aadhaar?",
    subtitle: "Follow this 3-step process",
    btnText: "Verify Aadhaar",
    steps: [
      {
        title: "Aadhaar Number",
        subtitle: "Enter your 12 Digit Aadhaar Card number",
        imageUri: require("../../assets/AadhaarHelp1.png"),
      },
      {
        title: "Aadhaar OTP",
        subtitle: "Enter OTP you received on Aadhaar registered mobile number",
        imageUri: require("../../assets/AadhaarHelp2.png"),
      },
      {
        title: "Confirm Identity",
        subtitle:
          "Confirm your Aadhaar details - Name, Date of birth & Address",
        imageUri: require("../../assets/AadhaarHelp3.png"),
      },
    ],
    questions: [
      {
        title: "Q: Why do I need to verify Aadhaar?",
        subtitle:
          "A: Digital aadhaar verification proves your identity and address",
      },
      {
        title: "Q: What is aadhaar OTP?",
        subtitle:
          "A: Aadhaar OTP is sent via UIDAI for authentication purposes.",
      },
      {
        title: "Q: I did not get any OTP for Aadhaar verification",
        subtitle:
          "A: Please ensure that you have access to the mobile number linked with your Aadhaar in order to get the OTP.",
      },
      {
        title: "Q: I don't know which mobile number is linked with Aadhaar",
        subtitle:
          "A: Follow this process:\nStep 1: Go to https://myaadhaar.uidai.gov.in/verifyAadhaar\nStep 2: Enter 12-digit Aadhaar number and captcha code \nStep 3: Click on ‘Proceed to Verify’ \nStep 4: Here you will see the last three digits of the linked mobile number.",
      },
      {
        title: "Q: Do I need to submit physical copy of my Aadhaar card?",
        subtitle:
          "A: No. Aadhaar verification is a completely paperless process.",
      },
    ],
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("ProfileForm") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="AadhaarForm">
      <LogoHeaderBack
        headline={"Aadhaar Verification"}
        subHeadline={
          "भारतीय रिजर्व बैंक के मानदंडों के अनुसार, आपको अपना आधार वेरीफाई करना अनिवार्य है।"
        }
        onLeftIconPress={backAction}
        onRightIconPress={() => setVisible(true)}
      />

      {visible && (
        <HelpSection
          visible={visible}
          setVisible={setVisible}
          data={aadhaarData}
        />
      )}

      <AadhaarFormTemplate setHelpSectionVisible={setVisible} />
    </SafeAreaView>
  );
};

export default AadhaarForm;
