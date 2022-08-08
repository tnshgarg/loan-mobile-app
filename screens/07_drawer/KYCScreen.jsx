import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Aadhaar from "./Aadhaar";
import PAN from "./PAN";
import Bank from "./Bank";

const Tab = createMaterialTopTabNavigator();

const KYCScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "#4E46F1" } }}
    >
      <Tab.Screen name="Aadhaar" component={Aadhaar} />
      <Tab.Screen name="PAN" component={PAN} />
      <Tab.Screen name="Bank Details" component={Bank} />
    </Tab.Navigator>
  );
};

export default KYCScreen;

const styles = StyleSheet.create({});
