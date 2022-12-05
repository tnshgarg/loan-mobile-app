import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, styles } from "../../styles";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";
import InfoCard from "../../components/atoms/InfoCard";
import FormInput from "../../components/atoms/FormInput";
import Checkbox from "../../components/atoms/Checkbox";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();

  const [consent, setConsent] = useState(true);
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
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View style={[styles.container, { padding: 0 }]}>
          {/* <Text style={form.formHeader}>Aadhaar Verification</Text> */}
          <FormInput
            accessibilityLabel={"AadhaarInput"}
            placeholder={"Enter AADHAAR Number"}
            containerStyle={{ marginVertical: 10 }}
            keyboardType="phone-pad"
            autoFocus={true}
            value={number}
            onChange={setNumber}
            maxLength={12}
            numeric
          />

          {number && !validNumber ? (
            <Text style={bankform.formatmsg}>Invalid AADHAAR Number.</Text>
          ) : null}

          <InfoCard
            info={
              "My Mobile number is linked to my Aadhar card & I can receive the OTP on my Aadhar Linked Mobile Number"
            }
          />

          <Checkbox
            text={
              "I agree with the KYC registration Terms and Conditions to verifiy my identity."
            }
            value={consent}
            setValue={setConsent}
          />

          <AadhaarOtpApi
            data={{ aadhaar_number: number, consent: "Y" }}
            style={styles.btn}
            disabled={!validNumber || !consent}
            type={props?.route?.params?.type || ""}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default AadhaarFormTemplate;
