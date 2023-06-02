import {
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
  Linking,
} from "react-native";
import { onboardingStyles, styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Welcome from "../../assets/Welcome.svg";
import Info from "../../assets/Info.svg";
import Help from "../../assets/Help.svg";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import SvgContainer from "../../components/atoms/SvgContainer";
import LinearGradient from "react-native-linear-gradient";
import HelpHeader from "../../components/atoms/HelpHeader";
import HelpSection from "../../components/organisms/HelpSection";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";

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

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      {/* <LogoHeaderBack onRightIconPress={() => setVisible(true)} /> */}
      <View style={[styles.container, { backgroundColor: "#223240" }]}>
        <HelpHeader onPress={() => setVisible(true)} />

        <Text style={[styles.headline, { ...FONTS.h1, color: COLORS.white }]}>
          Congratulations on {"\n"}joining Unipe!
        </Text>
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
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <SvgContainer width={SIZES.width * 0.9} height={SIZES.width}>
            <Welcome />
          </SvgContainer>
        </View>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLORS.lightGreen, COLORS.lightYellow]}
          style={onboardingStyles.alertBox}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(110, 220, 133,0.1)", "rgba(237, 251, 139,0.1)"]}
            style={{
              padding: 10,
              borderRadius: 50,
            }}
          >
            <SvgContainer width={20} height={20}>
              <Info />
            </SvgContainer>
          </LinearGradient>

          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              flex: 1,
              paddingLeft: 10,
            }}
          >
            As per RBI guidelines, you have to complete e-KYC to get Advance
            Salary
          </Text>
        </LinearGradient>

        <PrimaryButton
          title="Start KYC"
          accessibilityLabel="WelcomeBtn"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", {
              unipeEmployeeId: unipeEmployeeId,
            });
            navigation.navigate("KycProgress");
          }}
        />
        <PrimaryButton
          title="I will do it later"
          containerStyle={{
            backgroundColor: null,
            borderWidth: 1.5,
            borderColor: COLORS.white,
          }}
          titleStyle={{ color: COLORS.white }}
          onPress={() => {
            navigation.navigate("HomeStack");
          }}
        />
      </View>
      {visible && (
        <HelpSection visible={visible} setVisible={setVisible} data={kycData} />
      )}
    </SafeAreaView>
  );
};

export default LoginSuccess;
