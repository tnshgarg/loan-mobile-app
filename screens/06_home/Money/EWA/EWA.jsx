import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import HomeMain from "../../HomeMain";
import { useNavigation } from "@react-navigation/core";
import DataCard from "../../../../components/DataCard";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";

const EWA = () => {
  const aadhaarVerifyState = useSelector((state) => state.aadhaar.verifyStatus);
  const panVerifyState = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyState = useSelector((state) => state.bank.verifyStatus);
  const panMisMatch = useSelector((state) => state.pan.misMatch);
  const bankMisMatch = useSelector((state) => state.bank.misMatch);
  const navigation = useNavigation();
  getUniqueId().then((id) => {
    console.log("Device Unique ID",id);
  });
  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    console.log("Device IP",ipv4Address);
  });
  const data = [
    { subtitle: "Days Present", value: "10" },
    { subtitle: "Expected Salary", value: "0" },
    { subtitle: "Expected Advanced Salary", value: "0" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {aadhaarVerifyState === "SUCCESS" &&
      panVerifyState === "SUCCESS" &&
      bankVerifyState === "SUCCESS" &&
      panMisMatch < 20 &&
      bankMisMatch < 20 ? (
        <>
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You are eligible for Advanced Salary.
          </Text>
          <DataCard title="Overview of Current Month" data={data} />
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
            You are not eligible for Advanced Salary.
          </Text>
          <HomeMain />
        </>
      )}
    </SafeAreaView>
  );
};

export default EWA;
