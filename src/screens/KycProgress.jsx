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

const KycProgress = () => {
  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const navigation = useNavigation();

  console.log({ profileComplete });

  const kycSteps = [
    {
      title: "Personal Info",
      subtitle: "Tell us about you",
      imageUri: <Profile />,
      status: profileComplete,
    },
    {
      title: "Aadhaar Card",
      subtitle: "Verify aadhaar with OTP",
      imageUri: <Aadhaar />,
      status: aadhaarVerifyStatus,
    },
    {
      title: "PAN Card",
      subtitle: "Enter PAN card details and verify",
      imageUri: <Pan />,
      status: panVerifyStatus,
    },
    {
      title: "Bank Account",
      subtitle: "Enter bank details and verify",
      imageUri: <Bank />,
      status: bankVerifyStatus,
    },
  ];

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "ProfileForm",
        },
      });
    } else if (aadhaarVerifyStatus === "INPROGRESS_OTP") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "AadhaarVerify",
        },
      });
    } else if (aadhaarVerifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "AadhaarConfirm",
        },
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "AadhaarForm",
        },
      });
    } else if (panVerifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "PanConfirm",
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "PanForm",
        },
      });
    } else if (bankVerifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWAStack", {
        screen: "EWA_KYC_STACK",
        params: {
          screen: "BankConfirm",
        },
      });
    } else if (bankVerifyStatus != "SUCCESS") {
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        headline={"Let’s get you verified"}
        subHeadline={"Complete the following 4 steps to verify your account "}
      />
      <View style={styles.container}>
        {kycSteps.map((item, index) => (
          <TouchableOpacity
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
                item.status == "SUCCESS" || item.status == true
                  ? COLORS.primary
                  : kycSteps[index].status == "PENDING" &&
                    (kycSteps[index - 1].status == "SUCCESS" ||
                      kycSteps[index - 1].status == true) &&
                    index >= 1
                  ? COLORS.gray
                  : COLORS.lightGray,
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
            {item.status == "SUCCESS" ||
              (item.status == true && (
                <SvgContainer height={16} width={16}>
                  <Tick />
                </SvgContainer>
              ))}

            <Badge text={`STEP ${index + 1}`} />
          </TouchableOpacity>
        ))}
        <View style={{ flex: 1 }} />
        <PrimaryButton title={"Continue"} onPress={handleConditionalNav} />
      </View>
    </SafeAreaView>
  );
};

export default KycProgress;
