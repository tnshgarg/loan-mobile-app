import Analytics, {InteractionTypes} from "../../helpers/analytics/commonAnalytics";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View, Linking} from "react-native";
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
  addEmployeeName,
  addOnboarded,
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
  const [aCTC, setACTC] = useState(authSlice?.aCTC);
  const [employeeName, setEmployeeName] = useState(authSlice?.employeeName);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);
  const token = authSlice?.token;
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
    dispatch(addACTC(aCTC));
  }, [aCTC]);

  useEffect(() => {
    dispatch(addEmployeeName(employeeName));
  }, [employeeName]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [onboarded]);

  useEffect(() => {
    dispatch(addUnipeEmployeeId(unipeEmployeeId));
  }, [unipeEmployeeId]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber?.length === 10) {
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
      console.log("Error while fetching phoneNumber: ", JSON.stringify(error));
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
        const responseJson = res?.data;
        console.log(`responseJson: ${JSON.stringify(responseJson)}`);
        if (responseJson.status === 200) {
          setACTC(responseJson.body.aCTC);
          setEmployeeName(responseJson.body.employeeName);
          setOnboarded(responseJson.body.onboarded);
          setUnipeEmployeeId(responseJson.body.unipeEmployeeId);
          sendSmsVerification(phoneNumber)
            .then((result) => {
              console.log(`result: ${JSON.stringify(result)}`);
              if (result["response"]["status"] || result["status"] === "success") {
                setLoading(false);
                Analytics.trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  component: "LoginScreen",
                  action: "SendSms",
                  status: "Success"
                });
                navigation.navigate("Otp");
              } else {
                setLoading(false);
                Alert.alert(
                  result["response"]["status"] || result["status"],
                  result["response"]["details"] || result["details"]
                );
                Analytics.trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  component: "LoginScreen",
                  action: "SendSms",
                  status: "Error",
                  error: result["response"]["details"] || result["details"],
                });
              }
            })
            .catch((error) => {
              setLoading(false);
              Alert.alert("Error", JSON.stringify(error));
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "LoginScreen",
                action: "SendSms",
                status: "Error",
                error: JSON.stringify(error),
              });
            });
        } else {
          setLoading(false);
          Alert.alert("Error", responseJson["message"]);
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "LoginScreen",
            action: "SignIn",
            status: "Error",
            phoneNumber: phoneNumber,
            error: responseJson["message"],
          });
        }
      })
      .catch((error) => {
        console.log("erer", error.message || JSON.stringify(error));
        setLoading(false);
        Alert.alert("Error", error.message || JSON.stringify(error));
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "LoginScreen",
          action: "SignIn",
          status: "Error",
          phoneNumber: phoneNumber,
          error: error.message || JSON.stringify(error),
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
