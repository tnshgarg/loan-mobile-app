import React from "react";
import { SafeAreaView } from "react-native";
import TopTabNav from "../../../../navigators/TopTabNav";
import Portal from "./Portal";
import Relation from "./Relation";
import EmployeeAddress from "./EmployeeAddress";
import NomineeAddress from "./NomineeAddress";
import { styles } from "../../../../styles";
import DocumentsView from "../../Documents/DocumentsView";
export default ESICForm = () => {
  const tabs = [
    { name: "Portal", component: DocumentsView },
    { name: "Family Details", component: DocumentsView },
    { name: "Your Address", component: DocumentsView },
    { name: "Nominee Address", component: DocumentsView },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};
