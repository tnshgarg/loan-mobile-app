import { useEffect } from "react";
import TopTabNav from "../../../navigators/TopTabNav";

import { BackHandler, SafeAreaView } from "react-native";
import Header from "../../../components/atoms/Header";
import { styles } from "../../../styles";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./Pan";

const KYCScreen = ({ navigation }) => {
  const tabs = [
    { name: "AADHAAR", component: Aadhaar },
    { name: "PAN", component: Pan },
    { name: "BANK", component: Bank },
    // { name: "MANDATE", component: Mandate },
  ];

  const backAction = () => {
    navigation.navigate("HomeStack", { screen: "Account" });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="KYC" onLeftIconPress={() => backAction()} />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};

export default KYCScreen;
