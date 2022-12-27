import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import DocumentsView from "./DocumentsView";
import License from "./License/License";
import LogoHeader from "../../../components/atoms/LogoHeader";
import { Ionicons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../../constants/Theme";
import Header from "../../../components/atoms/Header";

export default Documents = ({ navigation }) => {
  const tabs = [
    { name: "Driving License", component: License },
    // { name: "Offer Letter", component: DocumentsView },
    { name: "Pay Slips", component: DocumentsView },
    // { name: "ID Card", component: DocumentsView },
  ];
  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "DrawerHome",
      params: {
        screen: "Account",
      },
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
