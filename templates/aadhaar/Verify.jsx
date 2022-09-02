import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import AadhaarVerifyApi from "../../apis/aadhaar/Verify";
import { useNavigation } from "@react-navigation/core";
import { setAadhaarTimer } from "../../store/slices/timerSlice";
import { form, styles } from "../../styles";

const AadhaarVerifyTemplate = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(true);
  const countDownTime = useSelector((state) => state.timer.aadhaar);
  
  useEffect(() => {
    setValidOtp(otp.length === 6);
  }, [otp]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={form.OtpAwaitMsg}>
          Enter 6 digit OTP sent to your Aadhaar registered mobile number
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
          size={20}
          onFinish={() =>
            props.function ||
            navigation.navigate("KYC", {
              screen: "Aadhaar",
            })
          }
          style={{ marginTop: 20 }}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#4E46F1" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "MM", s: "SS" }}
          onChange={(time) => {
            dispatch(setAadhaarTimer(time));
          }}
        />

        <AadhaarVerifyApi
          data={{ otp: otp }}
          style={form.nextButton}
          disabled={!validOtp}
          type={props?.route?.params?.type || ""}
        />
        
      </View>
    </ScrollView>
  );
};

export default AadhaarVerifyTemplate;
