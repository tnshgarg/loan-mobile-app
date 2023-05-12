import { useNavigation } from "@react-navigation/core";
import { useEffect, useState, useRef } from "react";
import {
  Alert,
  BackHandler,
  Platform,
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
import { addToken } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer, setLoginTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OtpInput from "../../components/molecules/OtpInput";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import BackgroundTimer from "react-native-background-timer";

const OTPScreen = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigation = useNavigation();

  const [verified, setVerified] = useState(false);

  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);

  const countDownTime = useSelector((state) => state.timer.login);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  useEffect(() => {
    dispatch(addCurrentScreen("Otp"));
  }, []);

  let interval;

  useEffect(() => {
    interval = BackgroundTimer.setInterval(() => {
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
    console.log(back);
    if (!back) {
      Platform.OS === "ios"
        ? Alert.alert(
            "OTP Timer",
            "You must wait for 2 minutes to resend OTP.",
            [
              {
                text: "Don't leave",
                style: "destructive",
                onPress: () => {
                  navigation.navigate("Otp");
                },
              },
            ]
          )
        : Alert.alert(
            "OTP Timer",
            "You must wait for 2 minutes to resend OTP."
          );
    } else {
      Alert.alert("Hold on!", "Do you want to update your phone number ?", [
        {
          text: "No",
          onPress: () =>
            Platform.OS === "ios" ? navigation.navigate("Otp") : null,
          style: "cancel",
        },
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
        Alert.alert("Error", JSON.stringify(error));
        Analytics.trackEvent("OTPScreen|SendSms|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: JSON.stringify(error),
        });
      });
  };

  const onSubmitOtp = () => {
    setNext(false);
    checkVerification(phoneNumber, otp)
      .then((res) => {
        if (res["response"]["status"] === "success") {
          dispatch(addToken(res["response"]["token"]));
          setVerified(true);
          navigation.navigate("BackendSync", {
            destination:
              profileComplete ||
              aadhaarVerifyStatus ||
              panVerifyStatus ||
              bankVerifyStatus
                ? "HomeStack"
                : "LoginSuccess",
          });
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
        Alert.alert("Error", JSON.stringify(error));
        Analytics.trackEvent("OTPScreen|Check|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: JSON.stringify(error),
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
      <LogoHeaderBack
        leftOnPress={backAction}
        headline={"Verify mobile number"}
      />
      <View style={styles.container}>
        <View accessibilityLabel="OtpKeyboardView" style={styles.safeContainer}>
          <Text
            style={[
              styles.subHeadline,
              { width: "90%", marginTop: 10, textAlign: "left" },
            ]}
          >
            Please wait, we will auto verify the OTP sent to
          </Text>
          <View
            style={[
              styles.row,
              {
                alignSelf: "center",
                marginTop: 0,
                width: "90%",
              },
            ]}
          >
            <Text style={[styles.headline, { ...FONTS.body3, marginTop: 5 }]}>
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
                name="pencil-outline"
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <OtpInput
            otp={otp}
            setOtp={setOtp}
            inputRef={inputRef}
            accessibilityLabel="OtpInput"
          />

          <View style={{ flex: 1 }} />

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
              <Text style={{ color: COLORS.lightGray }}>
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
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;
