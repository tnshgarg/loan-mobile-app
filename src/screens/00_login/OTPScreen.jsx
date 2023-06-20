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
  useVerifyOtpMutation,
  useGenerateOtpMutation,
} from "../../store/apiSlices/loginApi";
import { addToken } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer, setLoginTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OtpInput from "../../components/molecules/OtpInput";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import BackgroundTimer from "react-native-background-timer";
import { showToast } from "../../components/atoms/Toast";
import { useLazyGetKycQuery } from "../../store/apiSlices/kycApi";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

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
  const [trigger, result, lastPromiseInfo] = useLazyGetKycQuery();

  const [kycCompleted, setKycCompleted] = useState(false);

  const [postVerifyOtp] = useVerifyOtpMutation();
  const [postGenerateOtp] = useGenerateOtpMutation();
  useEffect(() => {
    dispatch(addCurrentScreen("Otp"));
  }, []);

  let interval;

  // useEffect(() => {
  //   if (isAadhaarSuccess && isPanSuccess && isBankSuccess && isProfileSuccess) {
  //     setKycCompleted(true);
  //   }
  // }, [isAadhaarSuccess, isPanSuccess, isBankSuccess, isProfileSuccess]);

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
    postGenerateOtp(phoneNumber)
      .unwrap()
      .then((res) => {
        console.log({ res });

        setOtp("");
        setBack(false);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "OTPScreen",
          action: "SendSms",
          status: "Success",
        });
        Alert.alert("OTP resent successfully", "", [
          {
            text: "Ok",
            onPress: () => {
              inputRef.current.focus();
              dispatch(resetTimer());
            },
          },
        ]);
      })
      .catch((error) => {
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "OTPScreen",
          action: "SendSms",
          status: "Error",
          error: error.message,
        });
        console.log(error, error.message);
        showToast(error.message, "error");
        // Alert.alert("Error", error.message);
      });
  };

  const onSubmitOtp = () => {
    setNext(false);
    postVerifyOtp({ mobileNumber: phoneNumber, otp: otp })
      .unwrap()
      .then((res) => {
        // TODO: Verify Response
        console.log({ res });
        dispatch(addToken(res["token"]));
        trigger(res?.employeeDetails?.unipeEmployeeId, false)
          .then(({ data }) =>
            data?.kycCompleted
              ? navigation.navigate("HomeStack")
              : navigationHelper({
                  type: "cms",
                  params: { blogKey: "login_success" },
                })
          )
          .catch((err) => console.log(err));
        setVerified(true);

        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "OTPScreen",
          action: "Check",
          status: "Success",
        });
      })
      .catch((error) => {
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "OTPScreen",
          action: "Check",
          status: "Error",
          error: error?.message || error?.error?.message,
        });
        console.log(error);
        // Alert.alert("Error", error?.message || error?.error?.message);
        showToast(error?.message || error?.error?.message, "error");
        if (error?.status != 406) {
          navigation.navigate("Login");
        }
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
        onLeftIconPress={backAction}
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
