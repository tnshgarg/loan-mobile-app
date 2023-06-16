import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import FormInput from "../../components/atoms/FormInput";
import InfoCard from "../../components/atoms/InfoCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { addNumber } from "../../store/slices/aadhaarSlice";
import { styles } from "../../styles";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [validNumber, setValidNumber] = useState(true);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);

  useEffect(() => {
    let aadhaarReg = /^\d{12}$/gm;
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
            errorMsg={
              number && !validNumber ? strings.invalidAadhaarNumber : ""
            }
            numeric
            appendComponent={
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                {number.length}/12
              </Text>
            }
          />

          <InfoCard info={strings.agreeKycTNC} />

          <AadhaarOtpApi
            disabled={!validNumber}
            type={props?.route?.params?.type || ""}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default AadhaarFormTemplate;
