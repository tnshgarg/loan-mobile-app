import { Button } from "@react-native-material/core";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import TopTabNav from "../../components/TopTabNav";
import ESIC from "./ESIC";
import FamilyDetails from "./FamilyDetails";
import EmployeeAddress from "./EmployeeAddress";
import NomineeAddress from "./NomineeAddress";
import { styles } from "../styles";

export default ESICForm = () => {
  const tabs = [
    { name: "ESIC", component: ESIC },
    { name: "Family Details", component: FamilyDetails },
    { name: "Employee Address", component: EmployeeAddress },
    { name: "Nominee Address", component: NomineeAddress },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TopTabNav tabs={tabs} />
    </SafeAreaView>
  );
};
