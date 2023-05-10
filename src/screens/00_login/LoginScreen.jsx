import { STAGE } from "@env";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View, Linking} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import LogoHeader from "../../components/atoms/LogoHeader";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import LoginInput from "../../components/molecules/LoginInput";
import AgreementText from "../../components/organisms/AgreementText";
import { COLORS } from "../../constants/Theme";
import whatsappLinking from "../../helpers/WhatsappLinking";
import {
  useGenerateOtpMutation,
  useGetMobileMutation,
} from "../../store/apiSlices/loginApi";
import {
  addPhoneNumber,
  addUnipeEmployeeId,
} from "../../store/slices/authSlice";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import LoginInput from "../../components/molecules/LoginInput";
import AgreementText from "../../components/organisms/AgreementText";
import { STAGE } from "@env";

const LoginScreen = () => {
  SplashScreen.hide();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);

  const authSlice = useSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);
  const [postGenerateOtp] = useGenerateOtpMutation();
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [unipeEmployeeId, setUnipeEmployeeId] = useState(
    authSlice?.unipeEmployeeId
  );
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    dispatch(addUnipeEmployeeId(unipeEmployeeId));
  }, [unipeEmployeeId]);

  useEffect(() => {
    let phoneno = /^\d{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      dispatch(addPhoneNumber(phoneNumber));
      setNext(true);
    } else {
      setNext(false);
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      let phoneNumber = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNumber.replace("+91", ""));
    } catch (error) {
      console.log("Error while fetching phoneNumber: ", error.message);
    }
  };

  useEffect(() => {
    if (STAGE !== "dev") {
      onPhoneNumberPressed();
    }
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [postGetMobile] = useGetMobileMutation();
  const signIn = () => {
    setLoading(true);
    dispatch(resetTimer());
    postGetMobile(phoneNumber)
      .unwrap()
      .then((response) => {
        setUnipeEmployeeId(response["body"]["unipeEmployeeId"]);
        postGenerateOtp(phoneNumber)
          .unwrap()
          .then((otpResponse) => {
            console.log("otpResponse", otpResponse);
            if (otpResponse["status"] === "success") {
              setLoading(false);
              Analytics.trackEvent("LoginScreen|SendSms|Success", {
                phoneNumber: phoneNumber,
              });
              navigation.navigate("Otp");
            } else {
              setLoading(false);
              Alert.alert(otpResponse["status"], otpResponse["details"]);
              Analytics.trackEvent("LoginScreen|SendSms|Error", {
                phoneNumber: phoneNumber,
                error: otpResponse["details"],
              });
            }
          })
          .catch((error) => {
            console.log("error", error);
            setLoading(false);
            Alert.alert("Error", error.message);
            Analytics.trackEvent("LoginScreen|SendSms|Error", {
              phoneNumber: phoneNumber,
              error: error.message,
            });
          });
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView accessibilityLabel="LoginScreen" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          whatsappLinking();
        }}
      />
      <KeyboardAvoidingWrapper>
        <View>
          <Text style={styles.headline}>Verify your mobile</Text>
          <Text style={styles.subHeadline}>
            Your mobile number must be linked to your Aadhaar
          </Text>

          <LoginInput
            accessibilityLabel="MobileNumber"
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />

          <AgreementText
            isTermsOfUseModalVisible={isTermsOfUseModalVisible}
            setIsTermsOfUseModalVisible={setIsTermsOfUseModalVisible}
            isPrivacyModalVisible={isPrivacyModalVisible}
            setIsPrivacyModalVisible={setIsPrivacyModalVisible}
          />

          <PrimaryButton
            title="Verify"
            accessibilityLabel="LoginNextBtn"
            disabled={!next}
            loading={loading}
            onPress={() => signIn()}
          />
          <ShieldTitle title={"All your details are safe with us"} />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default LoginScreen;
