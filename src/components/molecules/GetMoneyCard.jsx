import { View, Text } from "react-native";
import { useEffect } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import Analytics, { InteractionTypes } from "../../helpers/analytics/commonAnalytics";

const GetMoneyCard = ({ navigation, eligible, amount, accessible }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here is your On-Demand Salary</Text>

      <Text style={[styles.text, { ...FONTS.h1 }]}>{amount}</Text>
      <View
        style={{
          width: "100%",
          borderWidth: 0.4,
          borderColor: COLORS.primary,
        }}
      />

      {/* TODO: add progress bar as background filled view */}

      <PrimaryButton
        title={
          (!eligible || !accessible) ? "Offer Inactive" : "Get Money Now"
        }
        disabled={!eligible || !accessible}
        onPress={() => {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "ExploreCards",
            action: `navigate:EWAStack:EWA_OFFER`,
            status: "",
          })
          navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
        }}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    padding: "15rem",
    flexDirection: "column",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.white,
  },
  text: { ...FONTS.body3, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;
