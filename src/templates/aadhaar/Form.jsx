import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { styles } from "../../styles";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";
import InfoCard from "../../components/atoms/InfoCard";
import FormInput from "../../components/atoms/FormInput";
import { COLORS, FONTS } from "../../constants/Theme";
import HelpCard from "../../components/atoms/HelpCard";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
      <View style={[styles.container, {}]}>
        <FormInput
          accessibilityLabel={"AadhaarInput"}
          placeholder={"Enter Aadhaar Number"}
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

        <InfoCard info={"OTP आधार के साथ लिंक मोबाइल नंबर पर भेजा जाएगा।"} />
        <View style={{ flex: 1 }} />
        <HelpCard text="Aadhaar" />

        <AadhaarOtpApi
          disabled={!validNumber}
          type={props?.route?.params?.type || ""}
        />
      </View>
    </SafeAreaView>
  );
};

export default AadhaarFormTemplate;
