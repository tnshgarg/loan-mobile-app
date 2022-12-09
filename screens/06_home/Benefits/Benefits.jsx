import { COLORS } from "../../../constants/Theme";
import TopTabNav from "../../../navigators/TopTabNav";
import DocumentsView from "../Documents/DocumentsView";
import ESICForm from "./ESIC/ESICForm";
import LogoHeader from "../../../components/atoms/LogoHeader";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native";
import { styles } from "../../../styles";

export default Benefits = () => {
  const tabs = [
    { name: "ESIC", component: ESICForm },
    { name: "EPFO", component: DocumentsView },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Benefits"}
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
