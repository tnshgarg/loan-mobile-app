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
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
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

  const handleNavigation = (token, unipeEmployeeId) => {
    if (token) {
      trigger(unipeEmployeeId, false)
        .then(({ data }) => {
          if (data?.kycCompleted) navigation.navigate("HomeStack");
          else navigation.navigate("LoginSuccess");
          // navigationHelper({
          //     type: "cms",
          //     params: { blogKey: "login_success" },
          //   })
        })
        .catch((err) => console.log(err));
    } else if (!phoneNumber) {
      navigation.navigate("Login");
    }
  };
  const onSubmitOtp = () => {
    postVerifyOtp({ mobileNumber: phoneNumber, otp: otp })
      .unwrap()
      .then((res) => {
        dispatch(addToken(res["token"]));
        handleNavigation(res["token"], res?.employeeDetails?.unipeEmployeeId);
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
          setOtp("");
          navigation.navigate("Login");
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
