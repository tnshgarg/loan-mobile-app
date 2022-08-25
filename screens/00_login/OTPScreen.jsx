import { Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import {
  checkVerification,
  sendSmsVerification,
} from "../../services/otp/Gupshup/services";
import { addLoginVerifyStatus } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer, setLoginTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";

export default OTPScreen = () => {
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);
  const auth = useSelector((state) => state.auth);
  const countDownTime = useSelector((state) => state.timer.login);
  console.log("OTPScreen state.auth: ", auth);

  const dispatch = useDispatch();

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
          <View style={styles.otpback}>
            {back ? (
              <IconButton
                icon={<Icon name="arrow-back" size={30} color="#4E46F1" />}
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <IconButton
                icon={<Icon name="arrow-back" size={30} color="#808080" />}
                onPress={() =>
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 30 seconds to resend otp"
                  )
                }
              />
            )}
          </View>
          <Image
            style={styles.logo}
            source={require("../../assets/unipe-Thumbnail.png")}
          />
          <Text style={styles.headline}>
            {" "}
            Please wait, we will auto verify the OTP {"\n"} sent to{" "}
            {phoneNumber}
            {back ? (
              <Icon
                name="edit"
                size={12}
                color="#4E46F1"
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <Icon
                name="edit"
                size={12}
                color="#808080"
                onPress={() =>
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 2 minutes to edit number"
                  )
                }
              />
            )}
          </Text>
          <TextInput
            style={styles.otpInput}
            letterSpacing={23}
            maxLength={6}
            numeric
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <CountDown
            until={countDownTime}
            onFinish={() => {
              setBack(true);
            }}
            size={20}
            style={{ marginTop: 20 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "#4E46F1" }}
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
                      Alert.alert("OTP resent successfully");
                    } else {
                      Alert.alert(
                        res["response"]["status"],
                        res["response"]["details"]
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
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
          {next ? (
            <Button
              uppercase={false}
              title="Verify"
              type="solid"
              color="#4E46F1"
              style={styles.ContinueButton}
              onPress={() => {
                setNext(false);
                checkVerification(phoneNumber, otp)
                  .then((res) => {
                    if (res["response"]["status"] === "success") {
                      navigation.navigate("AadhaarForm");
                      dispatch(addLoginVerifyStatus("SUCCESS"));
                      dispatch(resetTimer());
                    } else {
                      Alert.alert(
                        res["response"]["status"],
                        res["response"]["details"]
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    Alert.alert("Error", error);
                  });
              }}
            />
          ) : (
            <Button
              title="Verify"
              uppercase={false}
              type="solid"
              style={styles.ContinueButton}
              disabled
            />
          )}
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};
