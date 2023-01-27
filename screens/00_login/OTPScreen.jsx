import { useNavigation } from "@react-navigation/core";
import { useEffect, useState, useRef } from "react";
import {
  Alert,
  BackHandler,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  checkVerification,
  sendSmsVerification,
} from "../../services/otp/Gupshup/services";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer, setLoginTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import OtpInput from "../../components/molecules/OtpInput";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import BackgroundTimer from "react-native-background-timer";

const OTPScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [verified, setVerified] = useState(false);
  const inputRef = useRef();

  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);

  const countDownTime = useSelector((state) => state.timer.login);
  const onboarded = useSelector((state) => state.auth.onboarded);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  useEffect(() => {
    dispatch(addCurrentScreen("Otp"));
  }, []);

  let interval;

  useEffect(() => {
    interval = BackgroundTimer.setInterval(() => {
      console.log({ countDownTime });
      if (countDownTime > 0) {
        dispatch(setLoginTimer(countDownTime - 1));
      } else {
        setBack(true);
      }
    }, 1000);

    if (countDownTime < 1 || verified) {
      setBack(true);
      BackgroundTimer.clearInterval(interval);
    }
    return () => BackgroundTimer.clearInterval(interval);
  }, [countDownTime, verified]);

  useEffect(() => {
    if (otp.length === 6) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [otp]);

  const backAction = () => {
    if (!back) {
      Alert.alert("OTP Timer", "You must wait for 2 minutes to resend OTP.");
    } else {
      Alert.alert("Hold on!", "Do you want to update your phone number ?", [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("Login") },
      ]);
    }
    return true;
  };

  const onResendOtp = () => {
    sendSmsVerification(phoneNumber)
      .then((res) => {
        if (res["response"]["status"] === "success") {
          setOtp("");
          setBack(false);
          Alert.alert("OTP resent successfully", "", [
            {
              text: "Ok",
              onPress: () => {
                inputRef.current.focus();
                dispatch(resetTimer());
              },
            },
          ]);
          Analytics.trackEvent("OTPScreen|SendSms|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        } else {
          Alert.alert(res["response"]["status"], res["response"]["details"]);
          Analytics.trackEvent("OTPScreen|SendSms|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: res["response"]["details"],
          });
        }
      })
      .catch((error) => {
        console.log(error.toString());
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("OTPScreen|SendSms|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  const onSubmitOtp = () => {
    setNext(false);
    checkVerification(phoneNumber, otp)
      .then((res) => {
        console.log("res: ", res);
        if (res["response"]["status"] === "success") {
          setVerified(true);
          if (onboarded) {
            navigation.navigate("BackendSync", {
              destination: "HomeStack",
            });
          } else {
            navigation.navigate("BackendSync", {
              destination: "Welcome",
            });
          }
          Analytics.trackEvent("OTPScreen|Check|Success", {
            unipeEmployeeId: unipeEmployeeId,
            error: res["response"]["details"],
          });
        } else {
          Alert.alert(res["response"]["status"], res["response"]["details"]);
          Analytics.trackEvent("OTPScreen|Check|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: res["response"]["details"],
          });
        }
      })
      .catch((error) => {
        console.log(error.toString());
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("OTPScreen|Check|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView accessibilityLabel="OtpScreen" style={styles.safeContainer}>
      <LogoHeaderBack leftOnPress={backAction} />
      <KeyboardAvoidingWrapper>
        <View accessibilityLabel="OtpKeyboardView" style={styles.safeContainer}>
          <Text style={styles.headline}>Verify mobile number</Text>
          <Text style={styles.subHeadline}>
            Please wait, we will auto verify the OTP sent to
          </Text>
          <View style={[styles.row, { alignSelf: "center" }]}>
            <Text style={[styles.headline, { marginTop: 5, ...FONTS.h3 }]}>
              {phoneNumber}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                back
                  ? navigation.navigate("Login")
                  : Alert.alert(
                      "OTP Timer",
                      "You must wait for 2 minutes to edit number."
                    );
              }}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={18}
                color={back ? COLORS.primary : COLORS.gray}
              />
            </TouchableOpacity>
          </View>

          <OtpInput
            otp={otp}
            setOtp={setOtp}
            inputRef={inputRef}
            accessibilityLabel="OtpInput"
          />

          <Text style={styles.subHeadline} accessibilityLabel="OtpText">
            Didn’t receive the secure code?{" "}
            {back ? (
              <Text
                style={{ ...FONTS.h4, color: COLORS.primary }}
                onPress={onResendOtp}
              >
                Resend OTP
              </Text>
            ) : (
              <Text style={{ color: COLORS.secondary }}>
                Resend OTP in {Math.trunc(countDownTime / 60)}:
                {String("0" + (countDownTime % 60)).slice(-2)}
              </Text>
            )}
          </Text>
          <PrimaryButton
            accessibilityLabel="OtpBtn"
            title="Continue"
            disabled={!next}
            onPress={onSubmitOtp}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default OTPScreen;
