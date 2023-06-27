import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Aadhaar from "../assets/Aadhaar.svg";
import Bank from "../assets/Bank.svg";
import Pan from "../assets/Pan.svg";
import Profile from "../assets/Profile.svg";
import Tick from "../assets/Tick.svg";
import Badge from "../components/atoms/Badge";
import LogoHeader from "../components/atoms/LogoHeader";
import PrimaryButton from "../components/atoms/PrimaryButton";
import SvgContainer from "../components/atoms/SvgContainer";
import { COLORS, FONTS } from "../constants/Theme";
import { strings } from "../helpers/Localization";
import { KYC_POLLING_DURATION } from "../services/constants";
import { useGetKycQuery } from "../store/apiSlices/kycApi";
import { styles } from "../styles";

const KS = {
  PROFILE_FORM: 0,
  AADHAAR_FORM: 1,
  AADHAAR_OTP: 2,
  AADHAAR_CONFIRMATION: 3,
  PAN_FORM: 4,
  PAN_CONFIRMATION: 5,
  BANK_FORM:6,
  BANK_CONFIRMATION: 7,
  COMPLETE: 8,
}


const redirectScreen = {
  [KS.PROFILE_FORM]:"ProfileForm",
  [KS.AADHAAR_FORM]:"AadhaarForm",
  [KS.AADHAAR_OTP]:"AadhaarVerify",
  [KS.AADHAAR_CONFIRMATION]:"AadhaarConfirm",
  [KS.PAN_FORM]:"PanForm",
  [KS.PAN_CONFIRMATION]:"PanConfirm",
  [KS.BANK_FORM]:"BankForm",
  [KS.BANK_CONFIRMATION]:"BankConfirm",
}










const getKYCStage = (isProfileSuccess, aadhaar,pan, bank) => {
  if (!isProfileSuccess)
    return KS.PROFILE_COMPLETE
  if (!["INPROGRESS_OTP", "INPROGRESS_CONFIRMATION", "SUCCESS"].includes(aadhaar.verifyStatus))
    return KS.AADHAAR_FORM
  if (aadhaar.verifyStatus === "INPROGRESS_OTP")
    return KS.AADHAAR_OTP
  if (aadhaar.verifyStatus === "INPROGRESS_CONFIRMATION")
    return KS.AADHAAR_CONFIRMATION
  if (!["INPROGRESS_CONFIRMATION", "SUCCESS"].includes(pan.verifyStatus))
    return KS.PAN_FORM
  if (pan.verifyStatus === "INPROGRESS_CONFIRMATION") 
    return KS.PAN_CONFIRMATION
  if (!["INPROGRESS_CONFIRMATION", "SUCCESS"].includes(bank.verifyStatus)) {
    return KS.BANK_FORM
  }
  if (bank.verifyStatus === "INPROGRESS_CONFIRMATION") 
    return KS.BANK_CONFIRMATION
  return KS.COMPLETE
}
const KycProgress = () => {
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const navigation = useNavigation();

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: KYC_POLLING_DURATION,
  });

  console.log({ kycData });
  const {
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
    aadhaar,
    pan,
    bank,
  } = kycData ?? {};

  const kycSteps = [
    {
      title: "Personal Info",
      subtitle: "Tell us about you",
      imageUri: <Profile />,
      status: isProfileSuccess,
    },
    {
      title: "Aadhaar Card",
      subtitle: "Verify aadhaar with OTP",
      imageUri: <Aadhaar />,
      status: isAadhaarSuccess,
    },
    {
      title: "PAN Card",
      subtitle: "Enter PAN card details and verify",
      imageUri: <Pan />,
      status: isPanSuccess,
    },
    {
      title: "Bank Account",
      subtitle: "Enter bank details and verify",
      imageUri: <Bank />,
      status: isBankSuccess,
    },
  ];

  const handleConditionalNav = () => {
    let kycStage = getKYCStage(isProfileSuccess, aadhaar, pan, bank)
    navigation.navigate("EWAStack", {
      screen: "EWA_KYC_STACK",
      params: {
        screen: redirectScreen[kycStage]
      },
    });
  };

  const BORDER_COLOR = {
    // SUCCESS: COLORS.primary,
    // PENDING: COLORS.lightGray,
    true: COLORS.primary,
    false: COLORS.lightGray,
  };
  const TEXT_COLOR = { success: COLORS.primary, pending: COLORS.white };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        headline={strings.getYouVerified}
        subHeadline={strings.complete4Steps}
      />
      <View style={styles.container}>
        {kycSteps.map((item, index) => (
          <View
            key={index}
            style={{
              width: "100%",
              padding: 15,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderColor:
                BORDER_COLOR[
                  kycSteps[index - 1]?.status == true || index == 0
                    ? true
                    : item.status
                ],
            }}
          >
            <SvgContainer height={30} width={30}>
              {item.imageUri}
            </SvgContainer>
            <View style={{ flexDirection: "column", flex: 1, paddingLeft: 15 }}>
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                {item.title}
              </Text>
              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                {item.subtitle}
              </Text>
            </View>
            {item?.status == true ? (
              <SvgContainer height={16} width={16}>
                <Tick />
              </SvgContainer>
            ) : null}

            <Badge text={`${strings.step} ${index + 1}`} />
          </View>
        ))}
        <View style={{ flex: 1 }} />
        <PrimaryButton
          title={strings.continue}
          onPress={handleConditionalNav}
        />
      </View>
    </SafeAreaView>
  );
};

export default KycProgress;
