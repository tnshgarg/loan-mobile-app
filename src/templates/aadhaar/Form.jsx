import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import FormInput from "../../components/atoms/FormInput";
import HelpCard from "../../components/atoms/HelpCard";
import InfoCard from "../../components/atoms/InfoCard";
import { COLORS, FONTS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";
import { strings } from "../../helpers/Localization";
import { KYC_POLLING_DURATION } from "../../services/constants";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import { addNumber } from "../../store/slices/aadhaarSlice";
import { styles } from "../../styles";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [validNumber, setValidNumber] = useState(true);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
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
          placeholder={strings.enterAadhaarNumber}
          keyboardType="numeric"
          autoFocus={isFocused}
          value={number}
          onChange={setNumber}
          maxLength={12}
          errorMsg={number && !validNumber ? strings.invalidAadhaarNumber : ""}
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
          onRightIconPress={() =>
            navigationHelper({
              type: "cms",
              params: { blogKey: "aadhaar_help" },
            })
          }
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
