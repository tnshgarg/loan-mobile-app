import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles";
import LogoHeaderBack from "../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../constants/Theme";
import Profile from "../assets/Profile.svg";
import Bank from "../assets/Bank.svg";
import Pan from "../assets/Pan.svg";
import Tick from "../assets/Tick.svg";
import Aadhaar from "../assets/Aadhaar.svg";
import SvgContainer from "../components/atoms/SvgContainer";
import LinearGradient from "react-native-linear-gradient";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { useSelector } from "react-redux";
import Badge from "../components/atoms/Badge";
import LogoHeader from "../components/atoms/LogoHeader";
import { useNavigation } from "@react-navigation/core";
import { useGetKycQuery } from "../store/apiSlices/kycApi";
import { KYC_POLLING_DURATION } from "../services/constants";

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
    if (!isProfileSuccess) {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "ProfileForm",
        },
      });
    } else if (aadhaar.verifyStatus === "INPROGRESS_OTP") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "AadhaarVerify",
        },
      });
    } else if (aadhaar.verifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "AadhaarConfirm",
        },
      });
    } else if (aadhaar.verifyStatus != "SUCCESS") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "AadhaarForm",
        },
      });
    } else if (pan.verifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "PanConfirm",
        },
      });
    } else if (pan.verifyStatus != "SUCCESS") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "PanForm",
        },
      });
    } else if (bank.verifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "BankConfirm",
        },
      });
    } else if (bank.verifyStatus != "SUCCESS") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "BankForm",
        },
      });
    }
    // else if (onboarded) {
    //   navigation.navigate("EWA_KYC");
    // }
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
        headline={"Let’s get you verified"}
        subHeadline={"Complete the following 4 steps to verify your account "}
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
            {item.status == true ? (
              <SvgContainer height={16} width={16}>
                <Tick />
              </SvgContainer>
            ) : null}

            <Badge text={`STEP ${index + 1}`} />
          </View>
        ))}
        <View style={{ flex: 1 }} />
        <PrimaryButton title={"Continue"} onPress={handleConditionalNav} />
      </View>
    </SafeAreaView>
  );
};

export default KycProgress;
