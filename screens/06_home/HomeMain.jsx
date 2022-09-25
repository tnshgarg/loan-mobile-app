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
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);
  const message = [
    aadhaarStatus != "SUCCESS" ? "Aadhaar" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
    bankStatus != "SUCCESS" ? "Bank Details" : null,
    mandateStatus != "SUCCESS" ? "Mandate" : null,
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
