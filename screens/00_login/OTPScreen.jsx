import { Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  checkVerification,
  sendSmsVerification,
} from "../../services/otp/Gupshup/services";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer, setLoginTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/PrimaryButton";
import SVGImg from "../../assets/UnipeLogo.svg";
import Analytics from "appcenter-analytics";
import { styles } from "../../styles";
import { COLORS, SIZES } from "../../constants/Theme";
import FormInput from "../../components/atoms/FormInput";
import Header from "../../components/atoms/Header";

export default OTPScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const countDownTime = useSelector((state) => state.timer.login);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const onboarded = useSelector((state) => state.auth.onboarded);

  useEffect(() => {
    dispatch(addCurrentScreen("Otp"));
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [otp]);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        //title="Otp"
        onLeftIconPress={() =>
          back
            ? navigation.navigate("Login")
            : Alert.alert(
                "OTP Timer",
                "You must wait for 2 minutes to resend OTP."
              )
        }
      />
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
          <View style={styles.otpback}>
            {back ? (
              <IconButton
                icon={
                  <Icon name="arrow-back" size={30} color={COLORS.primary} />
                }
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <IconButton
                icon={
                  <Icon name="arrow-back" size={30} color={COLORS.primary} />
                }
                onPress={() => {
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 2 minutes to resend OTP."
                  );
                }}
              />
            )}
          </View>
          <SVGImg style={styles.logo} />
          <Text style={styles.headline}>
            {" "}
            Please wait, we will auto verify the OTP {"\n"} sent to{" "}
            {phoneNumber}
            {back ? (
              <Icon
                name="edit"
                size={12}
                color={COLORS.primary}
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <Icon
                name="edit"
                size={12}
                color={COLORS.gray}
                onPress={() =>
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 2 minutes to edit number."
                  )
                }
              />
            )}
          </Text>
          <FormInput
            containerStyle={{
              marginTop: 30,

              width: SIZES.width * 0.6,
              alignSelf: "center",
            }}
            letterSpacing={20}
            value={otp}
            onChange={setOtp}
            maxLength={6}
            keyboardType="numeric"
            placeholder={"******"}
            textAlign={"center"}
          />

          <CountDown
            until={countDownTime}
            onFinish={() => {
              setBack(true);
            }}
            size={20}
            style={{ marginTop: 20 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: COLORS.primary }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
            onChange={(time) => {
              dispatch(setLoginTimer(time));
            }}
          />
          {back ? (
            <Text
              style={styles.resendText}
              onPress={() => {
                sendSmsVerification(phoneNumber)
                  .then((res) => {
                    if (res["response"]["status"] === "success") {
                      setOtp("");
                      setBack(false);
                      dispatch(resetTimer());
                      Analytics.trackEvent("OtpScreen-OtpResend-Success", {
                        userId: id,
                      });
                      Alert.alert("OTP resent successfully");
                    } else {
                      Analytics.trackEvent("OtpScreen-OtpResend-Error", {
                        userId: id,
                        error: result["response"]["details"],
                      });
                      Alert.alert(
                        res["response"]["status"],
                        res["response"]["details"]
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    Analytics.trackEvent("OtpScreen-OtpResend-Error", {
                      userId: id,
                      error: error,
                    });
                    Alert.alert("Error", error);
                  });
              }}
            >
              Resend
            </Text>
          ) : null}
          <Text style={styles.otpreadtxt}>
            {" "}
            Sit back & relax while we fetch the OTP & log you inside the Unipe
            App
          </Text>
          <PrimaryButton
            title="Verify"
            disabled={!next}
            onPress={() => {
              setNext(false);
              checkVerification(phoneNumber, otp)
                .then((res) => {
                  if (res["response"]["status"] === "success") {
                    Analytics.trackEvent("OtpScreen-OtpVerification-Success", {
                      userId: id,
                    });
                    if (onboarded) {
                      Analytics.trackEvent(
                        "OtpScreen-OnboardingStatus-Success",
                        { userId: id }
                      );
                      navigation.navigate("BackendSync", {
                        destination: "Home",
                      });
                    } else {
                      Analytics.trackEvent(
                        "OtpScreen-OnboardingStatus-Pending",
                        { userId: id }
                      );
                      navigation.navigate("BackendSync", {
                        destination: "Welcome",
                      });
                    }
                    dispatch(resetTimer());
                  } else {
                    Analytics.trackEvent("OtpScreen-OtpVerification-Error", {
                      userId: id,
                      error: result["response"]["details"],
                    });
                    Alert.alert(
                      res["response"]["status"],
                      res["response"]["details"]
                    );
                  }
                })
                .catch((error) => {
                  console.log(error);
                  Analytics.trackEvent("OtpScreen-OtpVerification-Error", {
                    userId: id,
                    error: error,
                  });
                  Alert.alert("Error", error);
                });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};
