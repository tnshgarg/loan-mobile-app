import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import DocumentsView from "./DocumentsView";
import { BackHandler, SafeAreaView } from "react-native";
import Header from "../../../components/atoms/Header";
import { useEffect } from "react";

export default Documents = ({ navigation }) => {
  const tabs = [
    { name: "Driving License", component: DocumentsView },
    // { name: "Offer Letter", component: DocumentsView },
    { name: "Pay Slips", component: DocumentsView },
    // { name: "ID Card", component: DocumentsView },
  ];
  const backAction = () => {
    navigation.navigate("AccountStack", {
      screen: "AccountMenu",
    });
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Documents" onLeftIconPress={() => backAction()} />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};
