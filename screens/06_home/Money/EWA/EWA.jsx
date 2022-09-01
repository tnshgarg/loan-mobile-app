import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import HomeMain from "../../HomeMain";
import { useNavigation } from "@react-navigation/core";
import DataCard from "../../../../components/DataCard";

const EWA = () => {
  const aadhaarVerifyState = useSelector((state) => state.aadhaar.verifyStatus);
  const panVerifyState = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyState = useSelector((state) => state.bank.verifyStatus);
  const navigation = useNavigation();
  const data = [
    { subtitle: "Days Present", value: "10" },
    { subtitle: "Expected Salary", value: "0" },
    { subtitle: "Expected EWA", value: "0" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {aadhaarVerifyState === "SUCCESS" &&
      panVerifyState === "SUCCESS" &&
      bankVerifyState === "SUCCESS" ? (
        <>
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are eligible for EWA.
          </Text>
          <DataCard title="EWA Details" data={data} />
          <PrimaryButton
            title="Apply"
            uppercase={false}
            onPress={() => {
              navigation.navigate("EWALanding");
            }}
          />
        </>
      ) : (
        <>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are not eligible for EWA.
          </Text>
          <HomeMain />
        </>
      )}
    </SafeAreaView>
  );
};

export default EWA;
