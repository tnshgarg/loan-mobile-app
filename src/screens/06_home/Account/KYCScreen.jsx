import { useEffect } from "react";
import TopTabNav from "../../../navigators/TopTabNav";

import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./Pan";
import Header from "../../../components/atoms/Header";
import { BackHandler, SafeAreaView } from "react-native";
import { styles } from "../../../styles";

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
