import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, styles } from "../../styles";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";
import InfoCard from "../../components/atoms/InfoCard";
import FormInput from "../../components/atoms/FormInput";
import Checkbox from "../../components/atoms/Checkbox";
import { COLORS, FONTS } from "../../constants/Theme";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
          <Text style={styles.headline}>Enter your Aadhaar number</Text>
          <Text style={styles.subHeadline}>
            कृपया अपना आधार नम्बर यहाँ भरें ॰ इस आधार नम्बर से जुड़े मोबाइल
            नम्बर पर हम ओ॰टी॰पी॰ भेजेंगे ॰
          </Text>
          <FormInput
            accessibilityLabel={"AadhaarInput"}
            placeholder={"Aadhaar Number"}
            keyboardType="numeric"
            autoFocus={isFocused}
            value={number}
            onChange={setNumber}
            maxLength={12}
            errorMsg={number && !validNumber ? "Invalid Aadhaar Number" : ""}
            numeric
            appendComponent={
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                {number.length}/12
              </Text>
            }
          />

          <InfoCard
            info={
              "Please note: You will receive an OTP to your Aadhaar registered mobile number."
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
