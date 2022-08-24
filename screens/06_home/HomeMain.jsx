import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { docSearch, styles } from "../../styles";
import HomeCard from "../../components/HomeCard";
import { useSelector } from "react-redux";
import { allAreNull } from "../../helpers/nullCheck";

export default HomeMain = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const message = [
    bankStatus != "SUCCESS" ? "Bank Details" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
    aadhaarStatus != "SUCCESS" ? "Aadhaar" : null,
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!allAreNull(message) ? (
          <HomeCard
            title="Following pending steps need to be completed in order to receive advance salary."
            message={message}
          />
        ) : (
          <Text style={styles.Maintitle}>
            You've completed all the KYC steps for onboarding
          </Text>
        )}
      </SafeAreaView>
    </>
  );
};
