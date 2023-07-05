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
import { styles } from "../../styles";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const { aadhaar } = kycData ?? {};

  const [number, setNumber] = useState(aadhaar?.number);
  let aadhaarReg = /^\d{12}$/gm;
  let isValidAadhaar = false;
  if (aadhaarReg.test(number || "")) {
    isValidAadhaar = true;
  }

  useEffect(() => {
    if (isValidAadhaar) {
      trackEvent({
        interaction: InteractionTypes.SCREEN_OPEN,
        screen: "aadhaar",
        action: "VALID",
      });
      trackEvent({
        interaction: InteractionTypes.SCREEN_OPEN,
        screen: "aadhaar",
        action: "COMPLETE",
      });
    } else {
      trackEvent({
        interaction: InteractionTypes.SCREEN_OPEN,
        screen: "aadhaar",
        action: "INVALID",
      });
    }
  }, [isValidAadhaar]);

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
          errorMsg={
            number && !isValidAadhaar ? strings.invalidAadhaarNumber : ""
          }
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
          onPress={() =>
            navigationHelper({
              type: "cms",
              params: { blogKey: "aadhaar_help" },
            })
          }
        />

        <AadhaarOtpApi
          disabled={!isValidAadhaar || kycLoading}
          type={props?.route?.params?.type || ""}
          number={number}
        />
      </View>
    </SafeAreaView>
  );
};

export default AadhaarFormTemplate;
