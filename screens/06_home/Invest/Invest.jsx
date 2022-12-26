import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../../../styles";
import LogoHeader from "../../../components/atoms/LogoHeader";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../../constants/Theme";
import InvestSVG from "../../../assets/Invest.svg";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import LiquiloansTitle from "../../../components/atoms/LiquiloansTitle";

import Analytics from "appcenter-analytics";
import { useSelector } from "react-redux";
import { showToast } from "../../../components/atoms/Toast";

const Invest = (props) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  useEffect(() => {
    Analytics.trackEvent("Invest|Visited", {
      unipeEmployeeId: unipeEmployeeId,
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
        <InvestSVG style={{ marginLeft: "-10%" }} />
        <Text style={{ ...FONTS.body4, color: COLORS.black, marginTop: 10 }}>
          Welcome to Unipe Invest.
        </Text>
        <Text style={{ ...FONTS.body2, color: COLORS.black }}>
          You are only <Text style={{ ...FONTS.h2 }}>2 steps</Text> away from
          making your 1st investment
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.gray,
            marginTop: 20,
            width: "70%",
          }}
        >
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
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
                textDecorationLine: "underline",
              }}
            >
              How it works?
            </Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title="Invest now"
          onPress={() => {
            Analytics.trackEvent("Invest|WaitListed", {
              unipeEmployeeId: unipeEmployeeId,
            });
            showToast("You've joined the waitlist for Unipe Invest!!");
          }}
        />
        <LiquiloansTitle title={"an RBI registered NBFC-P2P"} />
      </View>
    </SafeAreaView>
  );
};

export default Invest;
