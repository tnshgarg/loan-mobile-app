import { Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
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
    if (otp.length === 6) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [otp]);

  const backAction = () => {
    if (!back) {
      Alert.alert(
        "OTP Timer",
        "You must wait for 2 minutes to resend OTP."
      );
    } else {
      Alert.alert("Hold on!", "Are you sure you want to Logout?", [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("Login") }
      ]);
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="OTP"
        onLeftIconPress={() => backAction()}
      />
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
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
            autoFocus={true}
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
                      Analytics.trackEvent("OTPScreen|SendSms|Success", {
                        unipeEmployeeId: unipeEmployeeId,
                      });
                      Alert.alert("OTP resent successfully");
                    } else {
                      Analytics.trackEvent("OTPScreen|SendSms|Error", {
                        unipeEmployeeId: unipeEmployeeId,
                        error: result["response"]["details"],
                      });
                      Alert.alert(
                        res["response"]["status"],
                        res["response"]["details"]
                      );
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
                    Analytics.trackEvent("OTPScreen|Check|Success", {
                      unipeEmployeeId: unipeEmployeeId,
                    });
                    if (onboarded) {
                      navigation.navigate("BackendSync", {
                        destination: "Home",
                      });
                    } else {
                      navigation.navigate("BackendSync", {
                        destination: "Welcome",
                      });
                    }
                    dispatch(resetTimer());
                  } else {
                    Analytics.trackEvent("OTPScreen|Check|Error", {
                      unipeEmployeeId: unipeEmployeeId,
                      error: result["response"]["details"],
                    });
                    Alert.alert(
                      res["response"]["status"],
                      res["response"]["details"]
                    );
                  }
                })
                .catch((error) => {
                  console.log(error.toString());
                  Analytics.trackEvent("OTPScreen|Check|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                    error: error.toString(),
                  });
                  Alert.alert("Error", error.toString());
                });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default OTPScreen;
