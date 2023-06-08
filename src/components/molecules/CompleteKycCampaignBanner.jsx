import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import FullWidthImage from "../atoms/FullWidthImage";
import { View, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    flexDirection: "column",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.white,
  }
});

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
      Alert.alert("KYC Successfully Completed", "Congratulations! You are now eligible for advance salary withdrawal.");
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleConditionalNav}>
        <FullWidthImage url={url} />
      </TouchableOpacity>
    </View>
  );
};


export default CompleteKycCampaignBanner;
