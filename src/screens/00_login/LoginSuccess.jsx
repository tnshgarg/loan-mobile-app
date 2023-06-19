import { Text, SafeAreaView, Alert, BackHandler } from "react-native";
import { styles } from "../../styles";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import { useDispatch, useSelector } from "react-redux";
import Welcome from "../../assets/Welcome.svg";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import HelpSection from "../../components/organisms/HelpSection";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import SuccessContainer from "../../components/organisms/SuccessContainer";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const LoginSuccess = () => {
  const kycData = {
    heading: "Help - KYC Verification",
    headingImage: require("../../assets/KycHeader.png"),
    title: "KYC verification in just 3 simple steps",
    subtitle: "Verify your identity & complete your full KYC ",
    btnText: "Start KYC",
    keyPoints: [
      { title: "0% Interest Rate" },
      { title: "₹0 joining fees" },
      { title: "1 Lac Employees Joined" },
    ],
    stepsTitle: "How to complete your KYC?",
    stepsSubtitle: "Follow this 3-step process",
    steps: [
      {
        title: "Verify Aadhaar",
        subtitle:
          "Enter your Aadhaar number and complete verification with OTP",
        imageUri: require("../../assets/KycHelp1.png"),
      },
      {
        title: "Verify PAN Card",
        subtitle: "Enter your PAN Card number and verify the details.",
        imageUri: require("../../assets/KycHelp2.png"),
      },
      {
        title: "Add Bank Account",
        subtitle:
          "Enter your bank account number to receive the advance salary money",
        imageUri: require("../../assets/KycHelp3.png"),
      },
    ],
    questions: [
      {
        title: "Q: Do I need to pay for KYC",
        subtitle: "A: No. KYC is FREE.",
      },
      {
        title: "Q: Why do I need to do KYC?",
        subtitle: "A: As per RBI Regulations, KYC verification is mandatory.",
      },
      {
        title: "Q: What are the required documents for KYC?",
        subtitle:
          "A: Aadhaar Card and PAN Card are mandatory to initiate KYC process.",
      },
      {
        title: "Q: How much time will KYC Process take?",
        subtitle: "A: KYC happens instantly with government APIs.",
      },
      {
        title: "Q: What happens if I don’t complete my minimum KYC?",
        subtitle: "A: You won't be able to withdraw your advance salary.",
      },
    ],
  };
  const [visible, setVisible] = useState(false);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("LoginSuccess"));
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
    title: "Congratulations on \n joining Unipe!",
    // subtitle: "Your employer, Amazon, has initiated your onboarding process.",
    renderSubtitle: () => (
      <Text
        style={[
          styles.subHeadline,
          {
            color: COLORS.white,
            ...FONTS.body3,
            width: "100%",
          },
        ]}
      >
        Your employer,{" "}
        <Text
          style={{
            ...FONTS.h3,
            color: "#D9F68A",
          }}
        >
          XXXXXXX
        </Text>
        , has initiated your onboarding process.
      </Text>
    ),
    // videoUri: "",
    // videoThumbnail:
    //   "https://static-cse.canva.com/blob/1068019/1600w-wlXEWqHuexQ.jpg",

    imageUri: <Welcome />,
    primaryBtnText: "Start KYC",
    primaryBtnIcon: "arrow-right",
    primaryBtnLabel: "WelcomeBtn",
    onPressPrimaryBtn: () => {
      requestUserPermission();
      Analytics.trackEvent("WelcomePage", {
        unipeEmployeeId: unipeEmployeeId,
      });
      navigation.navigate("KycProgress");
    },
    secondaryBtnText: "I will do it later",
    onPressSecondaryBtn: () => {
      navigation.navigate("HomeStack");
    },
    infoText:
      "As per RBI guidelines, you have to complete e-KYC to get Advance Salary",
  };

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeaderBack
        containerStyle={{ backgroundColor: "#223240" }}
        hideLogo={true}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "AadhaarHelp" },
          })
        }
      />
      <SuccessContainer data={data} />

      {visible && (
        <HelpSection visible={visible} setVisible={setVisible} data={kycData} />
      )}
    </SafeAreaView>
  );
};

export default LoginSuccess;
