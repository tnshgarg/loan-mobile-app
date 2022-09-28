import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import HomeCard from "../../components/HomeCard";
import { allAreNull } from "../../helpers/nullCheck";
import { styles } from "../../styles";


const HomeMain = () => {

  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const message = [
    bankStatus != "SUCCESS" ? "BANK" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!allAreNull(message) ? (
          <HomeCard
            title="Following pending steps need to be completed in order to receive advance salary."
            message={message}
          />
        ) : (
          <Text style={styles.Maintitle}>
            You've completed all the KYC steps for onboarding
          </Text>
        )}
      </SafeAreaView>
    </>
  );
};

export default HomeMain;
