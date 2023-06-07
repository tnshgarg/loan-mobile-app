import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import FullWidthImage from "../atoms/FullWidthImage";
import { Alert } from "react-native";
const MonthlyContestCampaignBanner = ({url,onPress,hasOffer}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
      if(onPress)
        onPress()      
      if (hasOffer)
        navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
      else
        Alert.alert("Advance Salary is not Enabled", "Please ask your employer to enable Advanced Salary for you")
    }}>
    <FullWidthImage url={url} />
    </TouchableOpacity>
  );
};

export default MonthlyContestCampaignBanner;
