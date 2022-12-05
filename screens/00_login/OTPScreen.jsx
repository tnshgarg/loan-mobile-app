import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
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
import { styles, form } from "../../styles";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import OtpInput from "../../components/molecules/OtpInput";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";

const OTPScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  useEffect(() => {
    let interval = setInterval(() => {
      console.log({ countDownTime });

      if (countDownTime > 0) {
        dispatch(setLoginTimer(countDownTime - 1));
      } else {
        setBack(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownTime]);

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
          dispatch(resetTimer());
          Analytics.trackEvent("OTPScreen|SendSms|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
          Alert.alert("OTP resent successfully");
        } else {
          Analytics.trackEvent("OTPScreen|SendSms|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: res["response"]["details"],
          });
          Alert.alert(res["response"]["status"], res["response"]["details"]);
        }
      })
      .catch((error) => {
        console.log(error.toString());
        Analytics.trackEvent("OTPScreen|SendSms|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
        Alert.alert("Error", error.toString());
      });
  };

  const onSubmitOtp = () => {
    setNext(false);
    checkVerification(phoneNumber, otp)
      .then((res) => {
        console.log("res: ", res);
        if (res["response"]["status"] === "success") {
          if (onboarded) {
            navigation.navigate("BackendSync", {
              destination: "HomeStack",
            });
          } else {
            navigation.navigate("BackendSync", {
              destination: "WelcomePage",
            });
          }
          dispatch(resetTimer());
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
    <SafeAreaView style={styles.safeContainer}>
      {/* <LogoHeader
        leftIcon={
          <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
        }
        leftOnPress={backAction}
        rightIcon={
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      /> */}
      <LogoHeaderBack leftOnPress={backAction} />
      <KeyboardAvoidingWrapper>
        <View style={styles.safeContainer}>
          <Text style={styles.headline}>Verify mobile number</Text>
          <Text style={styles.subHeadline}>
            Please wait, we will auto verify the OTP sent to
          </Text>
          <Text style={[styles.headline, { marginTop: 5, ...FONTS.h3 }]}>
            {phoneNumber}

            <MaterialCommunityIcons
              name="pencil"
              size={16}
              color={back ? COLORS.primary : COLORS.gray}
              onPress={() => {
                back
                  ? navigation.navigate("Login")
                  : Alert.alert(
                      "OTP Timer",
                      "You must wait for 2 minutes to edit number."
                    );
              }}
            />
          </Text>
          <OtpInput otp={otp} setOtp={setOtp} />

          <Text style={styles.subHeadline}>
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
