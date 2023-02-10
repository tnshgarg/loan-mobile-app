import Analytics from "appcenter-analytics";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import { useDispatch, useSelector } from "react-redux";
import PushNotification, { Importance } from "react-native-push-notification";
import SplashScreen from "react-native-splash-screen";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import {
  addACTC,
  addOnboarded,
  addPhoneNumber,
  addToken,
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
  const [aCTC, setACTC] = useState(authSlice?.aCTC);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);
  const [token, setToken] = useState(authSlice?.token);
  const [unipeEmployeeId, setUnipeEmployeeId] = useState(
    authSlice?.unipeEmployeeId
  );

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "Onboarding",
        channelName: "OnboardingChannel",
        channelDescription:
          "A channel for users who have not completed Onboarding Journey",
        playSound: false,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
    PushNotification.localNotificationSchedule({
      title: "Complete Your Onboarding Steps",
      message: "Complete Your Onboarding Journey to avail your Advance Salary",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // {24 hours}
      allowWhileIdle: false,
      channelId: "Onboarding",
      smallIcon: "ic_notification_fcm_icon",
      repeatType: "day",
      repeatTime: 2,
    });
  }, []);

  useEffect(() => {
    dispatch(addCurrentStack("OnboardingStack"));
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    dispatch(addToken(token));
  }, [token]);

  useEffect(() => {
    dispatch(addACTC(aCTC));
  }, [aCTC]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [onboarded]);

  useEffect(() => {
    dispatch(addUnipeEmployeeId(unipeEmployeeId));
  }, [unipeEmployeeId]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      dispatch(addPhoneNumber(phoneNumber));
      setNext(true);
    } else {
      setNext(false);
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      var phoneNumber = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNumber.replace("+91", ""));
    } catch (error) {
      console.log("Error while fetching phoneNumber: ", error.toString());
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

  const signIn = () => {
    setLoading(true);
    dispatch(resetTimer());
    var fullPhoneNumber = `+91${phoneNumber}`;
    putBackendData({
      data: { number: fullPhoneNumber },
      xpath: "mobile",
      token: token,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setACTC(res.data.body.aCTC);
          setOnboarded(res.data.body.onboarded);
          setToken(res.data.body.token);
          setUnipeEmployeeId(res.data.body.unipeEmployeeId);
          sendSmsVerification(phoneNumber)
            .then((result) => {
              if (result["response"]["status"] === "success") {
                setLoading(false);
                Analytics.trackEvent("LoginScreen|SendSms|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
                navigation.navigate("Otp");
              } else {
                setLoading(false);
                Alert.alert(
                  result["response"]["status"],
                  result["response"]["details"]
                );
                Analytics.trackEvent("LoginScreen|SendSms|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: result["response"]["details"],
                });
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert("Error", error.toString());
              Analytics.trackEvent("LoginScreen|SendSms|Error", {
                unipeEmployeeId: unipeEmployeeId,
                error: error.toString(),
              });
            });
        } else {
          setLoading(false);
          Alert.alert("Error", res.data["message"]);
          Analytics.trackEvent("LoginScreen|SignIn|Error", {
            phoneNumber: phoneNumber,
            error: res.data["message"],
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("LoginScreen|SignIn|Error", {
          phoneNumber: phoneNumber,
          error: error.toString(),
        });
      });
  };

  return (
    <SafeAreaView accessibilityLabel="LoginScreen" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
         rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
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
