import { SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import HomeCard from "../../components/HomeCard";
import { allAreNull } from "../../helpers/nullCheck";
import { styles } from "../../styles";


const HomeMain = () => {

  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);
  
  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    mandateStatus != "SUCCESS" ? "Mandate" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
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
