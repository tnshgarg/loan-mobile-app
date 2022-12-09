import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import DocumentsView from "./DocumentsView";
import License from "./License/License";
import LogoHeader from "../../../components/atoms/LogoHeader";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../../constants/Theme";

export default Documents = () => {
  const tabs = [
    { name: "Driving License", component: License },
    // { name: "Offer Letter", component: DocumentsView },
    { name: "Pay Slips", component: DocumentsView },
    // { name: "ID Card", component: DocumentsView },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Documents"}
        rightIcon={
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};
