import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../styles";
import KycCheckCard from "../../components/KycCheckCard";
import HomeOfferCard from "../../components/HomeOfferCard";

const HomeView = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <KycCheckCard />
        <HomeOfferCard />
      </SafeAreaView>
    </>
  );
};

export default HomeView;
