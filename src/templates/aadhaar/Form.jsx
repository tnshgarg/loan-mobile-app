import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import FormInput from "../../components/atoms/FormInput";
import InfoCard from "../../components/atoms/InfoCard";
import { COLORS, FONTS } from "../../constants/Theme";
import HelpCard from "../../components/atoms/HelpCard";
import { useGetAadhaarQuery } from "../../store/apiSlices/aadhaarApi";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [validNumber, setValidNumber] = useState(true);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const { aadhaar } = kycData ?? {};

  const [number, setNumber] = useState(aadhaar?.number);

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
              {number?.length}/12
            </Text>
          }
        />

        <InfoCard info={"OTP आधार के साथ लिंक मोबाइल नंबर पर भेजा जाएगा।"} />
        <View style={{ flex: 1 }} />
        <HelpCard
          text="Aadhaar"
          onPress={() => {
            props.setHelpSectionVisible(true);
          }}
        />

        <AadhaarOtpApi
          disabled={!validNumber}
          type={props?.route?.params?.type || ""}
          number={number}
        />
      </View>
    </SafeAreaView>
  );
};

export default AadhaarFormTemplate;
