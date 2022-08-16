import CheckBox from "@react-native-community/checkbox";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, form, styles, checkBox } from "../../styles";

import Verify from "../../apis/pan/Verify";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { addNumber } from "../../store/slices/panSlice";

export default PanForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [consent, setConsent] = useState(false);
  const [validNumber, setValidNumber] = useState(true);

  const panSlice = useSelector((state) => state.pan);
  const [number, setNumber] = useState(panSlice?.number);

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  useEffect(() => {
    var panReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm;
    if (panReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  const SkipPAN = () => {
    Alert.alert(
      "PAN KYC pending",
      `If you want to receive advance salary, PAN KYC is required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankInfoForm") },
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
              // TODO: Conditional if Aadhaar verified or not
              onPress={() => navigation.navigate("AadhaarConfirm")}
            />
          }
        />

        <ProgressBarTop step={2} />
        <Text style={form.formHeader}>PAN Verification</Text>

        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Enter PAN Number</Text>
            <TextInput
              style={form.formTextInput}
              autoCapitalize="characters"
              value={number}
              onChangeText={setNumber}
              // placeholder="AAAAA1234A"
              maxLength={10}
              required
            />
            {number && !validNumber ? (
              <Text style={bankform.formatmsg}>Invalid PAN Number.</Text>
            ) : null}

            <View style={form.forgotText}>
              <Text
                style={styles.termsText}
                onPress={() =>
                  Linking.openURL(
                    "https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit"
                  )
                }
              >
                Forgot PAN?
              </Text>
            </View>

            <View style={bankform.infoCard}>
              <Icon name="info-outline" size={20} color="#4E46F1" />
              <Text style={bankform.infoText}>
                PAN is required to verify name and date of birth.
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

            <Verify
              url={"https://api.gridlines.io/pan-api/fetch-detailed"}
              data={{ pan_number: number, consent: "Y" }}
              style={form.skipButton}
              disabled={!validNumber || !consent}
            />

            <Button
              title="Skip"
              uppercase={false}
              type="solid"
              color="#4E46F1"
              style={form.skipButton}
              onPress={() => SkipPAN()}
            />
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
