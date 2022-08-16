import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import CountDown from "react-native-countdown-component";
import ProgressBarTop from "../../components/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

import Verify from "../../apis/aadhaar/Verify";
import { form, styles } from "../../styles";

export default AadhaarVerify = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backDisabled, setBackDisabled] = useState(true);
  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(true);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarVerify"));
  }, []);
  
  useEffect(() => {
    setValidOtp(otp.length === 6);
  }, [otp]);

  return (
    <SafeAreaView style={styles.container}>

      <AppBar
        title="Setup Profile"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => navigation.navigate("AadhaarForm")}
            disabled={backDisabled}
          />
        }
      />

      <ProgressBarTop step={1} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>

          <Text style={form.OtpAwaitMsg}>Enter 6 digit OTP sent to your Aadhaar registered mobile number</Text>
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
            until={60 * 10}
            onFinish={() => setBackDisabled(false)}
            size={20}
            style={{ marginTop: 20 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "#4E46F1" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
          />

          <Verify
            url={"https://api.gridlines.io/aadhaar-api/boson/submit-otp"}
            data={{ otp: otp }}
            style={form.nextButton}
            disabled={!validOtp}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
