import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import InvestSVG from "../../../assets/Invest.svg";
import LogoHeader from "../../../components/atoms/LogoHeader";
import PoweredByTag from "../../../components/atoms/PoweredByTag";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../../constants/Theme";
import { investStyles, styles } from "../../../styles";

import Analytics, { InteractionTypes } from "../../../helpers/analytics/commonAnalytics";

import { useSelector } from "react-redux";
import { showToast } from "../../../components/atoms/Toast";

const Invest = (props) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  useEffect(() => {
    Analytics.trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      flow: "invest",
      screen: "invest",
      action: "VISITED",
    });
  }, []);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Invest"}
        rightIcon={
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      />
      <View style={styles.container}>
        <InvestSVG style={{ marginLeft: "-15%" }} />
        <Text style={investStyles.title}>Welcome to Unipe Invest.</Text>
        <Text style={investStyles.subtitle}>
          You are only <Text style={{ ...FONTS.h2 }}>2 steps</Text> away from
          making your 1st investment
        </Text>
        <Text style={investStyles.description}>
          proceed to verify your details and start growing your wealth.
        </Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props.navigation.navigate("InvestStack", {
                screen: "HowItWorks",
              });
            }}
          >
            <Text style={investStyles.underlineText}>How it works?</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title="Invest now"
          onPress={() => {
            Analytics.trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              flow: "invest",
              screen: "invest",
              action: "WAITLISTED",
            });
            showToast(
              "You've joined the waitlist for Unipe Invest!!",
              "success"
            );
          }}
        />
        <PoweredByTag
          image={[require("../../../assets/LiquiLoansLogo.jpg")]}
          title={"an RBI registered NBFC-P2P"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Invest;
