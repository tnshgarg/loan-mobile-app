import CheckBox from "@react-native-community/checkbox";
import { Icon } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, checkBox, form } from "../../styles";

import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";


const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();

  const [consent, setConsent] = useState(false);
  const [validNumber, setValidNumber] = useState(true);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);

  useEffect(() => {
    var aadhaarReg = /^[0-9]{12}$/gm;
    if (aadhaarReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);
  
  return (
    <>
      <KeyboardAvoidingWrapper>
        <View>
          <Text style={form.formHeader}>Aadhaar Verification</Text>
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
              I agree with the KYC registration Terms and Conditions to verifiy
              my identity.
            </Text>
          </View>

          <AadhaarOtpApi
            data={{ aadhaar_number: number, consent: "Y" }}
            style={form.nextButton}
            disabled={!validNumber || !consent}
            type={props?.route?.params?.type || ""}
          />

        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
};

export default AadhaarFormTemplate;
