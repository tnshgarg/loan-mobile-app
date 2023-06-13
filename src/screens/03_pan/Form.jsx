import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "../../styles";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";
import Header from "../../components/atoms/Header";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import HelpSection from "../../components/organisms/HelpSection";
import { useGetAadhaarQuery } from "../../store/apiSlices/aadhaarApi";

export default PanForm = () => {
  const panData = {
    heading: "Help - Pan Verification",
    headingImage: require("../../assets/PanHeader.png"),
    title: "How to verify PAN?",
    subtitle: "Follow this 2-step process",
    btnText: "Verify Pan",
    steps: [
      {
        title: "Pan Number",
        subtitle: "Enter your PAN Card number (Permanent Account Number)",
        imageUri: require("../../assets/PanHelp1.png"),
      },
      {
        title: "Verify PAN Card",
        subtitle: "Enter your PAN Card number and verify the details.",
        imageUri: require("../../assets/PanHelp2.png"),
      },
    ],
    questions: [
      {
        title: "Q: Why do I need to verify my PAN Card?",
        subtitle: "A: PAN card verification proves your income and identity",
      },
      {
        title: "Q: Do I need to submit physical copy of my PAN card",
        subtitle: "A: No. PAN verification is a completely paperless process.",
      },
      {
        title: "Q: I don't have a Pan Card, what should I do?",
        subtitle:
          "A: Don't worry, you can simply apply for an e-PAN card from the website of the Income Tax Department. Applying for PAN is absolutely free and it takes only 5 minutes.\n[Icon - Application Form]\n[Short Title - How to Apply for an e-PAN Card?]\nFollow these simple steps to apply for an e-PAN Card:\nVisit the official website of the Income Tax Department.\nClick on the 'Instant PAN through Aadhaar' option.\nEnter your Aadhaar number and captcha code.\nClick on 'Generate Aadhaar OTP'.\nVerify your Aadhaar details.\nClick on 'Submit' to generate your e-PAN Card.\n[Icon - Payment]\n[Short Title] - Charges for e-PAN Card?\n[Body] - There are no charges for e-PAN Card application. It is completely free of cost.\n[Icon - Time/Clock/Hourglass]\n[Short Title] - Time to Generate e-PAN Card?\n[Body] - The e-PAN Card is generated instantly after successful verification of Aadhaar details.\nFor any further assistance, please refer to this link: https://www.incometax.gov.in/iec/foportal/help/how-to-generate-instant-e-pan",
      },
      {
        title: "Q: I don't remember my Pan Card number, what should I do?",
        subtitle:
          "A: You can find your PAN Card number in any of the following ways:\n\nOption 1: Income Tax Website\nStep 1: Head over to https://www.incometaxindiaefiling.gov.in/\nStep 2: Click on “Know Your PAN” under section “Quick Links”\nStep 3: Enter the details - including name, date of birth & mobile number\nStep 4: Enter the OTP you received on the mobile number and click on “Validate”\nStep 5: Now enter your Father’s name and click on the “Submit” button\n\nOption 2: Salary slip\nCheck your payslip to find your PAN number. It should be mentioned on the payslip if you receive regular salary payments from your employer. If you can't find it, contact your HR or finance department for assistance.\n\nOption 3: Form-16\nPAN numbers are mentioned in the Form 16 given to you by your employer. Most organisations mail the form 16 to their employees and/or upload the same to an internal portal.\n",
      },
    ],
  };

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: aadhaarData } = useGetAadhaarQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });

  console.log({ aadhaarData });

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "If you go back your Aadhaar Verification will have to be redone. Continue only if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            aadhaarData?.verifyStatus === "SUCCESS"
              ? navigation.navigate("AadhaarConfirm")
              : navigation.navigate("AadhaarForm");
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
        headline={"PAN Card Verification"}
        subHeadline={
          "हमें आपका नाम और जन्मतिथि जांच करने के लिए आपके पैन की आवश्यकता है।"
        }
        onLeftIconPress={backAction}
        onRightIconPress={() => setVisible(true)}
      />

      {visible && (
        <HelpSection visible={visible} setVisible={setVisible} data={panData} />
      )}
      <PanFormTemplate setHelpSectionVisible={setVisible} />
    </SafeAreaView>
  );
};
