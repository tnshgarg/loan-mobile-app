import { OG_API_KEY } from "@env";
import CheckBox from "@react-native-community/checkbox";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import {
  addAadhaarNumber,
  addAadhaarSubmitOTPtxnId,
} from "../../store/slices/aadhaarSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, checkBox, form, styles } from "../../styles";

export default AadhaarForm = () => {
  const [consent, setConsent] = useState(false);
  const [aadhaar, setAadhaar] = useState(
    useSelector((state) => state.aadhaar.number)
  );
  const navigation = useNavigation();
  const [next, setNext] = useState(false);
  const [transactionId, setTransactionId] = useState(
    useSelector((state) => state.aadhaar.submitOTPtxnId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);
  
  useEffect(() => {
    dispatch(addAadhaarSubmitOTPtxnId(transactionId));
  }, [transactionId]);

  useEffect(() => {
    dispatch(addAadhaarNumber(aadhaar));
  }, [aadhaar]);

  useEffect(() => {
    if (aadhaar.length === 12) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [aadhaar]);

  const SkipAadhaar = () => {
    Alert.alert(
      "Aadhaar KYC pending",
      `You have not completed Aadhaar KYC.`
    );
    navigation.navigate("PanCardInfo");
  };

  const GenerateOtp = () => {
    const data = {
      aadhaar_number: aadhaar,
      consent: "Y",
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

    fetch(`https://api.gridlines.io/aadhaar-api/boson/generate-otp`, options)
      .then((response) => response.json())
      .then((response) => {
        {
          if (response["status"] == "200") {
            switch (response["data"]["code"]) {
              case "1001":
                setTransactionId(response["data"]["transaction_id"]);
                navigation.navigate("AadhaarVerify");
                break;

              case "1011":
              case "1008":
                // TODO: handle above cases for backend data push
                break;

              case "1012":
                setErrorMsg(response["data"]["message"]);
                Alert.alert("Error", response["data"]["message"]);
                break;
            }
          } else {
            if (response["error"]) {
              setErrorMsg(response["error"]["message"]);
              Alert.alert("Error", response["error"]["message"]);
            } else {
              setErrorMsg(response["message"]);
              Alert.alert("Error", response["message"]);
            }
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
        Alert.alert("Error", err);
      });
  };

  const backAlert = () =>
    Alert.alert(
      "Heading Back?",
      "If you continue to go back your OTP authentication would be invalid and you would have to redo it!",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("Otp") },
      ]
    );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => {
                backAlert();
              }}
            />
          }
        />
        <ProgressBarTop step={1} />
        <Text style={form.formHeader}>
          Let's begin with your background verification processs with eKYC
        </Text>
        <ScrollView keyboardShouldPersistTaps="handled">
              {aadhaar ? (
                <Text style={form.formLabel}>
                  Enter 12 Digit Aadhaar Number
                </Text>
              ) : null}
              <TextInput
                style={form.formTextInput}
                value={aadhaar}
                onChangeText={setAadhaar}
                placeholder="Enter 12 Digit Aadhaar Number"
                maxLength={12}
                numeric
              />
              <View style={bankform.infoCard}>
                <Icon name="info-outline" size={20} color="#4E46F1" />
                <Text style={bankform.infoText}>  
                  My Mobile number is linked to my Aadhar card & I can receive
                  the OTP on my Aadhar Linked Mobile Number
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  value={consent}
                  onValueChange={setConsent}
                  style={checkBox.checkBox}
                  tintColors={{ true: "#4E46F1" }}
                />
                <Text style={checkBox.checkBoxText}>
                  I agree with the KYC registration Terms and Conditions to
                  verifiy my identity.
                </Text>
              </View>
              {next && consent ? (
                <Button
                  uppercase={false}
                  title="Continue"
                  type="solid"
                  color="#4E46F1"
                  style={form.nextButton}
                  onPress={() => {
                    GenerateOtp();
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
              <View>
                <Button
                    title="Skip"
                    uppercase={false}
                    type="solid"
                    color="#4E46F1"
                    style={form.skipButton}
                    onPress={() => {
                      SkipAadhaar();
                    }}
                />
              </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
