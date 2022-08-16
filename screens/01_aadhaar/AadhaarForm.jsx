import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";

import ProgressBarTop from "../../components/ProgressBarTop";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, checkBox, form, styles } from "../../styles";

import Otp from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

export default AadhaarForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [consent, setConsent] = useState(false);
  const [validNumber, setValidNumber] = useState(true);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  useEffect(() => {
    var aadhaarReg = /^[0-9]{12}$/gm;
    if (aadhaarReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  const SkipAadhaar = () => {
    Alert.alert(
      "Aadhaar KYC pending",
      `To formally complete your employment with the company, Aadhaar KYC is required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("PanForm") },
      ]
    );
  };

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Mobile Number Verification will have to be redone.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("Otp") },
      ]
    );
  };

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
        <Text style={form.formHeader}>Aadhaar Verification</Text>

        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Enter AADHAAR Number</Text>
            <TextInput
              style={form.formTextInput}
              value={number}
              onChangeText={setNumber}
              // placeholder="1234123412341234"
              maxLength={12}
              numeric
            />
            {number && !validNumber ? (
              <Text style={bankform.formatmsg}>Invalid AADHAAR Number.</Text>
            ) : null}

            <View style={bankform.infoCard}>
              <Icon name="info-outline" size={20} color="#4E46F1" />
              <Text style={bankform.infoText}>
                My Mobile number is linked with AADHAAR on which you can receive
                the OTP.
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

            {/* {next && consent ? (
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
            )} */}

            <Otp
              url={"https://api.gridlines.io/aadhaar-api/boson/generate-otp"}
              data={{ aadhaar_number: number, consent: "Y" }}
              style={form.skipButton}
              disabled={!validNumber || !consent}
            />

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
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
