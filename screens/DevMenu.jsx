import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";

const DevMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Welcome"
        onPress={() => navigation.navigate("Welcome")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="OTP Login"
        onPress={() => navigation.navigate("Login")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Aadhaar"
        onPress={() => navigation.navigate("AadhaarForm")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="PAN"
        onPress={() => navigation.navigate("PanCardInfo")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Bank Details"
        onPress={() => navigation.navigate("BankInfoForm")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Profile"
        onPress={() => navigation.navigate("PersonalDetailsForm")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Personal Photo"
        onPress={() => navigation.navigate("PersonalImage")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Home Screen"
        onPress={() => navigation.navigate("Home")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="KYC Screen"
        onPress={() => navigation.navigate("KYC")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Profile Details Screen"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default DevMenu;

const styles = StyleSheet.create({});
