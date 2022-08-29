import React from "react";
import { SafeAreaView, Text } from "react-native";
import TopTabNav from "../../../components/TopTabNav";
import { styles } from "../../../styles";
import HomeView from "../HomeView";
import EWA from "./EWA/EWA";

const Money = () => {
  const tabs = [
    { name: "EWA", component: EWA },
    { name: "Details", component: HomeView },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TopTabNav tabs={tabs} />
    </SafeAreaView>
  );
};

export default Money;
