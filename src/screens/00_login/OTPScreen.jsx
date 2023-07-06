import { useNavigation } from "@react-navigation/core";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { showToast } from "../../components/atoms/Toast";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import OtpInput from "../../components/molecules/OtpInput";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes
} from "../../helpers/analytics/commonAnalytics";
import { navigate } from "../../navigators/RootNavigation";
import { useLazyGetKycQuery } from "../../store/apiSlices/kycApi";
import {
  useGenerateOtpMutation,
  useVerifyOtpMutation,
} from "../../store/apiSlices/loginApi";
import { addToken } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer, setLoginTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";

const OTPScreen = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigation = useNavigation();

  const [verified, setVerified] = useState(false);

  const [otp, setOtp] = useState("");
  const [back, setBack] = useState(false);

  const countDownTime = useSelector((state) => state.timer.login);
  const { phoneNumber, unipeEmployeeId, token } = useSelector(
    (state) => state.auth || {}
  );
  const [trigger, result, lastPromiseInfo] = useLazyGetKycQuery();
  const [postVerifyOtp, { isLoading: verifyOtpLoading }] =
    useVerifyOtpMutation();
  const [postGenerateOtp] = useGenerateOtpMutation();

  let interval;

  useEffect(() => {
    Analytics.trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "otp",
      action: "START",
    });
  }, []);

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
                  Analytics.trackEvent({
                    interaction: InteractionTypes.BUTTON_PRESS,
                    screen: "otp",
                    action: "BACK",
                  });
                  navigate("OnboardingStack", { screen: "Otp" });
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
            Platform.OS === "ios"
              ? navigate("OnboardingStack", { screen: "Otp" })
              : null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigate("OnboardingStack", { screen: "Login" }),
        },
      ]);
    }
    return true;
  };

  const onResendOtp = () => {
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "otp",
      action: "RESENDOTP",
    });
    postGenerateOtp(phoneNumber)
      .unwrap()
      .then((res) => {
        console.log({ res });
        setOtp("");
        setBack(false);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "otp",
          action: "RESENDOTPSUCCESS",
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
          screen: "otp",
          action: "RESENDOTPERROR",
          error: error.message,
        });
        console.log(error, error.message);
        showToast(error.message, "error");
        // Alert.alert("Error", error.message);
      });
  };

  const handleNavigation = (token, unipeEmployeeId) => {
    if (token) {
      trigger(unipeEmployeeId, false)
        .then(({ data }) => {
          if (data?.kycCompleted) navigate("HomeStack", { screen: "Home" });
          else navigation.navigate("LoginSuccess");
        })
        .catch((err) => console.log(err));
    } else if (!phoneNumber) {
      navigate("OnboardingStack", { screen: "Login" });
    }
  };
  const onSubmitOtp = () => {
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "otp",
      action: "CONTINUE",
    });
    postVerifyOtp({ mobileNumber: phoneNumber, otp: otp })
      .unwrap()
      .then((res) => {
        dispatch(addToken(res["token"]));
        handleNavigation(res["token"], res?.employeeDetails?.unipeEmployeeId);
        setVerified(true);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "otp",
          action: "SUCCESS",
        });
      })
      .catch((error) => {
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "otp",
          action: "INVALID",
          error: error?.message || error?.error?.message,
        });
        console.log(error);
        // Alert.alert("Error", error?.message || error?.error?.message);
        showToast(error?.message || error?.error?.message, "error");
        if (error?.status != 406) {
          setOtp("");
          navigate("OnboardingStack", { screen: "Login" });
        }
      });
  };

  useEffect(() => {
    console.log("back handler subscribe called");
    dispatch(addCurrentScreen("Otp"));
    BackHandler.addEventListener("hardwareBackPress", backAction);
    handleNavigation(token, unipeEmployeeId);
    return () => {
      console.log("back handler unsubscribe called");
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  let isValidOtp = otp.length == 6;
  return (
    <SafeAreaView accessibilityLabel="OtpScreen" style={styles.safeContainer}>
      <LogoHeaderBack
        onLeftIconPress={backAction}
        headline={strings.verifyMobileNumber}
      />
      <View style={styles.container}>
        <View accessibilityLabel="OtpKeyboardView" style={styles.safeContainer}>
          <Text
            style={[
              styles.subHeadline,
              { width: "90%", marginTop: 10, textAlign: "left", fontSize: 13 },
            ]}
          >
            {strings.pleaseWaitOtp}
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
                  ? navigate("OnboardingStack", { screen: "Login" })
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

          <Text
            style={[styles.subHeadline, { fontSize: 14 }]}
            accessibilityLabel="OtpText"
          >
            {strings.didnotReceiveOtp}{" "}
            {back ? (
              <Text
                style={{ ...FONTS.h4, color: COLORS.primary }}
                onPress={onResendOtp}
              >
                {strings.resendOtp}
              </Text>
            ) : (
              <Text style={{ color: COLORS.lightGray }}>
                {strings.resendOtpIn} {Math.trunc(countDownTime / 60)}:
                {String("0" + (countDownTime % 60)).slice(-2)}
              </Text>
            )}
          </Text>
          <PrimaryButton
            accessibilityLabel="OtpBtn"
            title="Continue"
            disabled={!isValidOtp || verifyOtpLoading}
            loading={verifyOtpLoading}
            onPress={onSubmitOtp}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;
