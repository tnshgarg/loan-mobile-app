import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import DocumentsView from "./DocumentsView";
import { SafeAreaView } from "react-native";
import Header from "../../../components/atoms/Header";

export default Documents = ({ navigation }) => {
  const tabs = [
    { name: "Driving License", component: DocumentsView },
    // { name: "Offer Letter", component: DocumentsView },
    { name: "Pay Slips", component: DocumentsView },
    // { name: "ID Card", component: DocumentsView },
  ];
  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Account",
    });
    return true;
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Documents" onLeftIconPress={() => backAction()} />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};
