import { Image, SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { nav, styles } from "../../styles";
import { allAreNull } from "../../helpers/nullCheck";
import KycCheckCard from "../../components/KycCheckCard";
import HomeOfferCard from "../../components/HomeOfferCard";
import { useNavigation } from "@react-navigation/native";
import { AppBar, Icon, IconButton } from "@react-native-material/core";

const HomeView = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);
  const navigation = useNavigation();

  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    mandateStatus != "SUCCESS" ? "Mandate" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title={
            <Image
              style={nav.titleLogo}
              source={require("../../assets/unipe-Thumbnail.png")}
            />
          }
          centerTitle={true}
          contentContainerStyle={nav.navbar}
          color="#ffffff"
          leading={
            <IconButton
              icon={<Icon name="menu" size={30} />}
              onPress={() => {
                console.log("Menu");
                navigation.toggleDrawer();
              }}
            />
          }
          trailing={<IconButton icon={<Icon name="more-vert" size={30} />} />}
        />
        <KycCheckCard />
        {allAreNull(message) ? <HomeOfferCard /> : null}
      </SafeAreaView>
    </>
  );
};

export default HomeView;
