import { OG_API_KEY } from "@env";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import CountDown from "react-native-countdown-component";
import ProgressBarTop from "../../components/ProgressBarTop";
import {
  addAadhaarData,
  addAadhaarVerifyStatus,
} from "../../store/slices/aadhaarSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import { form, styles } from "../../styles";

export default AadhaarVerify = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const AadhaarTransactionId = useSelector(
    (state) => state.aadhaar.submitOTPtxnId
  );
  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [aadhaarData, setAadhaarData] = useState(
    useSelector((state) => state.aadhaar.data)
  );
  const [back, setBack] = useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarVerify"));
  }, []);
  useEffect(() => {
    dispatch(addAadhaarData(aadhaarData));
  }, [aadhaarData]);

  async function confirmVerificationCode() {
    const data = {
      otp: otp,
      include_xml: true,
      share_code: 1234,
      transaction_id: AadhaarTransactionId,
    };
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`https://api.gridlines.io/aadhaar-api/boson/submit-otp`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response["status"] == "200") {
          switch (response["data"]["code"]) {
            case "1002":
              setAadhaarData(response["data"]);
              navigation.navigate("AadhaarConfirm");
              dispatch(
                addAadhaarVerifyStatus("SUCCESS")
              );
              break;
            default:
              setErrorMsg(response["data"]["message"]);
              aadhaarBackendPush({
                id: id,
                status: "ERROR",
                message: errorMsg,
              });
              Alert.alert("Error", response["data"]["message"]);
          }
        } else {
          if (response["error"]) {
            setErrorMsg(response["error"]["message"]);
            aadhaarBackendPush({
              id: id,
              status: "ERROR",
              message: errorMsg,
            });
            Alert.alert("Error", response["error"]["message"]);
          } else {
            setErrorMsg(response["message"]);
            aadhaarBackendPush({
              id: id,
              status: "ERROR",
              message: errorMsg,
            });
            Alert.alert("Error", response["message"]);
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
        aadhaarBackendPush({
          id: id,
          status: "ERROR",
          message: errorMsg,
        });
        Alert.alert("Error", err);
      });
  }

  useEffect(() => {
    if (otp.length === 6) {
      setNext(true);
    } else {
      setNext(false);
    }
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
            disabled={!back}
          />
        }
      />
      <ProgressBarTop step={1} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={form.OtpAwaitMsg}>
            OTP has been sent vis SMS to your Aadhaar registered mobile number
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
            until={60 * 10}
            onFinish={() => setBack(true)}
            size={20}
            style={{ marginTop: 20 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "#4E46F1" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
          />

          {next ? (
            <Button
              uppercase={false}
              title="Continue"
              type="solid"
              color="#4E46F1"
              style={form.nextButton}
              onPress={() => {
                confirmVerificationCode();
              }}
            />
          ) : (
            <Button
              title="Continue"
              uppercase={false}
              type="solid"
              style={form.nextButton}
              disabled
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
