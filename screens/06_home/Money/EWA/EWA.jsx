import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { checkBox, styles } from "../../../../styles";
import PrimaryButton from "../../../../components/PrimaryButton";
import HomeMain from "../../HomeMain";
import { useNavigation } from "@react-navigation/core";
import DataCard from "../../../../components/DataCard";

const EWA = () => {
  const aadhaarVerifyState = useSelector((state) => state.aadhaar.verifyStatus);
  const panVerifyState = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyState = useSelector((state) => state.bank.verifyStatus);
  const panMisMatch = useSelector((state) => state.pan.misMatch);
  const bankMisMatch = useSelector((state) => state.bank.misMatch);
  const navigation = useNavigation();
  const data = [
    {
      day: "15",
      month: "Oct",
      amount: "3000",
      dueDate: "1st Nov, 2022",
      paid: false,
    },
    {
      day: "15",
      month: "Aug",
      amount: "1000",
      dueDate: "1st Sep, 2022",
      paid: false,
    },
    {
      day: "15",
      month: "Apr",
      amount: "2000",
      dueDate: "1st May, 2022",
      paid: true,
    },
    {
      day: "15",
      month: "Feb",
      amount: "10000",
      dueDate: "1st Mar, 2022",
      paid: true,
    },
    {
      day: "15",
      month: "Jan",
      amount: "5000",
      dueDate: "1st Feb, 2022",
      paid: true,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {aadhaarVerifyState === "SUCCESS" &&
      panVerifyState === "SUCCESS" &&
      bankVerifyState === "SUCCESS" &&
      panMisMatch < 20 &&
      bankMisMatch < 20 ? (
        <ScrollView>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginTop: "8%",
                color: "#597E8D",
                letterSpacing: 0.6,
              }}
            >
              Hi {useSelector((state) => state.aadhaar.data.name)}, here is you
              advanced Salary Access
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginBottom: "8%",
                color: "#3C3F54",
                letterSpacing: 0.8,
              }}
            >
              get money instantly
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 36 }}>₹20,000</Text>
            <Text style={{ fontSize: 16, color: "#597E8D" }}>
              days worked 15 days
            </Text>
            <Text style={{ fontSize: 16, color: "#597E8D" }}>
              available of total balance ₹20000
            </Text>
          </View>
          <PrimaryButton
            title="Get money now"
            uppercase={false}
            onPress={() => {
              navigation.navigate("EWALanding");
            }}
          />
          <View
            style={{
              alignSelf: "center",
            }}
          >
            {/* <Text style={{ fontSize: 16, color: "#597E8D", marginTop: "10%" }}>
              Your past draws
            </Text> */}
          </View>
          <View style={checkBox.padding}></View>
        </ScrollView>
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
