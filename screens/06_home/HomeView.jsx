import { useEffect } from "react";
import { SafeAreaView, BackHandler, Alert } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../styles";
import { allAreNull } from "../../helpers/nullCheck";
import KycCheckCard from "../../components/KycCheckCard";
import HomeOfferCard from "../../components/HomeOfferCard";

const HomeView = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);

  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    mandateStatus != "SUCCESS" ? "MANDATE" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
  ];
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home", { replace: true });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.removeEventListener();
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <KycCheckCard />
        {allAreNull(message) ? <HomeOfferCard /> : null}
      </SafeAreaView>
    </>
  );
};

export default HomeView;
