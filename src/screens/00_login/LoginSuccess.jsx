import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CmsLoading from "../../components/cms/CmsLoading";
import CmsRoot from "../../components/cms/CmsRoot";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { CMS_POLLING_DURATION } from "../../services/constants";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

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

  const {
    data: cmsData,
    isLoading: cmsLoading,
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: CMS_POLLING_DURATION,
  });
  console.log({cmsError, cmsData})
  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeaderBack
        containerStyle={{ backgroundColor: "#223240" }}
        hideLogo={true}
        onRightIconPress={() =>
          navigationHelper({
            type: "cms",
            params: { blogKey: "kyc_help" },
          })
        }
      />
      {!cmsData && cmsLoading ? (
        <CmsLoading />
      ) : (
        <CmsRoot children={cmsData?.login_success || []}></CmsRoot>
      )}
    </SafeAreaView>
  );
};

export default LoginSuccess;
