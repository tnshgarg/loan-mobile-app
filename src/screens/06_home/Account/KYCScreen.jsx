import { useEffect } from "react";
import TopTabNav from "../../../navigators/TopTabNav";

import { BackHandler, SafeAreaView } from "react-native";
import LogoHeaderBack from "../../../components/molecules/LogoHeaderBack";
import { styles } from "../../../styles";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./Pan";

const KYCScreen = ({ navigation }) => {
  const tabs = [
    { name: "AADHAAR", component: Aadhaar },
    { name: "PAN", component: Pan },
    { name: "BANK", component: Bank },
  ];

  const backAction = () => {
    // navigation.navigate("HomeStack", { screen: "Account" });
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title="KYC"
        onLeftIconPress={() => backAction()}
        containerStyle={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};

export default KYCScreen;
