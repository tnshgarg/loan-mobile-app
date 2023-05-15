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

const KycProgress = () => {
  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  console.log(aadhaarStatus);
  const kycSteps = [
    {
      title: "Personal Info",
      subtitle: "Tell us about you",
      imageUri: <Profile />,
      status: "SUCCESS",
    },
    {
      title: "Aadhaar Card",
      subtitle: "Verify aadhaar with OTP",
      imageUri: <Aadhaar />,
      status: "PENDING",
    },
    {
      title: "PAN Card",
      subtitle: "Enter PAN card details and verify",
      imageUri: <Pan />,
      status: "PENDING",
    },
    {
      title: "Bank Account",
      subtitle: "Enter bank details and verify",
      imageUri: <Bank />,
      status: "PENDING",
    },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
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
                item.status == "SUCCESS"
                  ? COLORS.primary
                  : kycSteps[index].status == "PENDING" &&
                    kycSteps[index - 1].status == "SUCCESS" &&
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
            {item.status == "SUCCESS" && (
              <SvgContainer height={16} width={16}>
                <Tick />
              </SvgContainer>
            )}
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["rgba(110, 220, 133,0.3)", "rgba(237, 251, 139,0.3)"]}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                marginLeft: 10,
              }}
            >
              <Text style={{ ...FONTS.h5 }}>STEP {index + 1}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
        <View style={{ flex: 1 }} />
        <PrimaryButton title={"Continue"} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default KycProgress;
