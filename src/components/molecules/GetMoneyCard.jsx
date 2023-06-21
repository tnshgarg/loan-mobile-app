import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import Coin from "../../assets/Coin.svg";
import Hourglass from "../../assets/Hourglass.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SvgContainer from "../atoms/SvgContainer";
import { useGetKycQuery } from "../../store/apiSlices/kycApi";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";

const GetMoneyCard = ({ navigation, eligible, amount, accessible }) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const {
    isAadhaarSuccess,
    isPanSuccess,
    isBankSuccess,
    isProfileSuccess,
    kycCompleted,
  } = kycData ?? {};

  const BUTTON_TEXT = {
    kycNotCompleted:
      "Verify your identity and complete your full KYC process to withdraw advance salary.",
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {kycCompleted ? (
            <SvgContainer height={20} width={20}>
              <Coin />
            </SvgContainer>
          ) : (
            <SvgContainer height={20} width={20}>
              <Hourglass />
            </SvgContainer>
          )}
          <Text style={[styles.text, { marginLeft: 10 }]}>
            {kycCompleted
              ? "Withdraw Advance Salary"
              : "KYC pending for Advance Salary"}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Available Salary</Text>
        <Text style={[styles.text, { ...FONTS.body1 }]}>
          {kycCompleted ? amount : "XX,XXX"}
        </Text>

        <PrimaryButton
          containerStyle={{ height: 40 }}
          title={
            kycCompleted
              ? !accessible
                ? "Offer Inactive"
                : !eligible
                ? "Offer Inactive"
                : "Get Salary Now"
              : "Complete Your KYC"
          }
          disabled={!kycCompleted ? false : !eligible || !accessible}
          onPress={() => {
            if (kycCompleted) {
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "GetMoneyCard",
                action: `navigate:EWAStack:EWA_OFFER`,
                status: "",
              });
              navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
            } else {
              Analytics.trackEvent({
                interaction: InteractionTypes.BUTTON_PRESS,
                component: "GetMoneyCard",
                action: `navigate:KycProgress`,
                status: "",
              });
              navigation.navigate("KycProgress");
            }
          }}
        />
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: kycCompleted
            ? COLORS.primaryBackground
            : COLORS.pendingBackground,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={styles.text}>
          {kycCompleted
            ? `Transfer ${amount} to your Bank account in minutes`
            : "Verify your identity and complete your full KYC process to withdraw advance salary."}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    // padding: "15rem",
    flexDirection: "column",
    borderRadius: 10,

    backgroundColor: "#f5f9f9",
  },
  text: { ...FONTS.body4, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;
