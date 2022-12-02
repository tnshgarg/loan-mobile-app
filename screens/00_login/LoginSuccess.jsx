import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useSelector } from "react-redux";
import Success from "../../assets/Success.svg";

const LoginSuccess = ({ navigation }) => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="help-circle-outline" size={28} color={COLORS.primary} />
        }
      />

      <View style={styles.container}>
        <Success style={{ alignSelf: "center", width: "70%" }} />
        <View style={{ flex: 1 }} />

        <Text
          style={[styles.subHeadline, { width: "90%", alignSelf: "center" }]}
        >
          <Text style={{ color: COLORS.warning }}>Congratulations!</Text> {"\n"}
          Your phone number verified successfully.
        </Text>
        <Text
          style={[
            styles.headline,
            {
              ...FONTS.h3,
              width: "90%",
              alignSelf: "center",
              marginBottom: 20,
            },
          ]}
        >
          As a next step please complete your eKYC to get money in your bank
          account
        </Text>
        <PrimaryButton
          title="Start eKYC"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("LoginSuccess", {
              unipeEmployeeId: unipeEmployeeId,
            });
            navigation.navigate("ProfileForm");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginSuccess;
