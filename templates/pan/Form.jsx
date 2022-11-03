import CheckBox from "@react-native-community/checkbox";
import { Icon } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, checkBox, form, styles } from "../../styles";

import PanVerifyApi from "../../apis/pan/Verify";
import { addNumber } from "../../store/slices/panSlice";
import InfoCard from "../../components/atoms/InfoCard";
import FormInput from "../../components/atoms/FormInput";
import Checkbox from "../../components/atoms/Checkbox";

const PanFormTemplate = (props) => {
  const dispatch = useDispatch();

  const [consent, setConsent] = useState(false);
  const [validNumber, setValidNumber] = useState(true);

  const panSlice = useSelector((state) => state.pan);
  const [number, setNumber] = useState(panSlice?.number);

  useEffect(() => {
    var panReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm;
    if (panReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <FormInput
            placeholder={"Enter PAN Number"}
            containerStyle={{ marginVertical: 10 }}
            autoCapitalize="characters"
            value={number}
            autoFocus={true}
            onChange={setNumber}
            maxLength={10}
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

          <InfoCard
            info={"PAN is required to verify name and date of birth."}
          />

          <Checkbox
            text={
              "I agree with the KYC registration Terms and Conditions to verifiy my identity."
            }
            value={consent}
            setValue={setConsent}
          />

          <PanVerifyApi
            data={{ pan_number: number, consent: "Y" }}
            disabled={!validNumber || !consent}
            type={props?.route?.params?.type || ""}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default PanFormTemplate;
