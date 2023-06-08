import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import FullWidthImage from "../atoms/FullWidthImage";
import { Alert } from "react-native";


const CompleteKycCampaignBanner = ({url,onPress}) => {
  const navigation = useNavigation();

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if(onPress)
      onPress()
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
        },
      });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
        },
      });
    } else {
      Alert.alert("KYC Already Complete", "Your KYC is already complete done")
    }
  }
  return (
    <TouchableOpacity onPress={handleConditionalNav}>
      <FullWidthImage url={url} />
    </TouchableOpacity>
  );
};

export default CompleteKycCampaignBanner;
