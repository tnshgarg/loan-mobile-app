import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Aadhaar from "../assets/Aadhaar.svg";
import Bank from "../assets/Bank.svg";
import Pan from "../assets/Pan.svg";
import Profile from "../assets/Profile.svg";
import Tick from "../assets/Tick.svg";
import Badge from "../components/atoms/Badge";
import PrimaryButton from "../components/atoms/PrimaryButton";
import SvgContainer from "../components/atoms/SvgContainer";
import { showToast } from "../components/atoms/Toast";
import LogoHeaderBack from "../components/molecules/LogoHeaderBack";
import { COLORS, FONTS } from "../constants/Theme";
import { navigationHelper } from "../helpers/CmsNavigationHelper";
import { strings } from "../helpers/Localization";
import { navigate } from "../navigators/RootNavigation";
import { KYC_POLLING_DURATION } from "../services/constants";
import { kycNavigate } from "../services/kyc/navigation";
import { useGetKycQuery } from "../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../store/apiSlices/mandateApi";
import { styles } from "../styles";

const KycProgress = () => {
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const navigation = useNavigation();

  const { data: kycData, isLoading: kycLoading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const {data: mandateData, isLoading: mandateLoading } = useGetMandateQuery(unipeEmployeeId)
  console.log({ kycData });
  const { isAadhaarSuccess, isPanSuccess, isBankSuccess, isProfileSuccess } =
    kycData ?? {};

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
  const continueButtonPress = () => {
    if (mandateData.verifyStatus == "SUCCESS") {
      showToast("You're all set for advance salary","success")
      navigate("HomeStack", { screen: "Money" });
    } else {
      kycNavigate(kycData, navigation);  
    }
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
      <LogoHeaderBack
        headline={strings.getYouVerified}
        subHeadline={strings.complete4Steps}
        onLeftIconPress={() => {
          Alert.alert(strings.goBack,strings.verifyYourIdentity,
            [
            {
              text: "yes",
              onPress: () => {
                navigate("HomeStack", {screen: "Home"});
              }
            },{
              text: "no",
              onPress: () => {}
            }
          ])
        }}
        onRightIconPress={() => {
          navigationHelper({
            type: "cms",
            screen: 2,
            params: { blogKey: "kyc_help" },
          });
        }}
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
              <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.gray,
                  marginTop: 5,
                }}
              >
                {item.subtitle}
              </Text>
            </View>
            {item?.status == true ? (
              <SvgContainer height={16} width={16}>
                <Tick />
              </SvgContainer>
            ) : null}

            <Badge
              text={`${strings.step} ${index + 1}`}
              containerStyle={{ marginLeft: 5 }}
            />
          </View>
        ))}
        <View style={{ flex: 1 }} />
        <PrimaryButton
          title={strings.continue}
          onPress={continueButtonPress}
          loading={kycLoading}
          disabled={kycLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default KycProgress;
