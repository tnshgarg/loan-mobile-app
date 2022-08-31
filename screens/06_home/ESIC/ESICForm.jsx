import React from "react";
import { SafeAreaView } from "react-native";
import TopTabNav from "../../../components/TopTabNav";
import Portal from "./Portal";
import Relation from "./Relation";
import EmployeeAddress from "./EmployeeAddress";
import NomineeAddress from "./NomineeAddress";
import { styles } from "../../../styles";

export default ESICForm = () => {
  const tabs = [
    { name: "Portal", component: Portal },
    { name: "Family Details", component: Relation },
    { name: "Employee Address", component: EmployeeAddress },
    { name: "Nominee Address", component: NomineeAddress },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TopTabNav tabs={tabs} />
    </SafeAreaView>
  );
};
