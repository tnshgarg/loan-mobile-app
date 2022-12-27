import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";

const GetMoneyCard = ({ navigation, eligible, amount, accessible }) => {
  // const navigation = useNavigation();

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
          !accessible
            ? "Offer Inactive"
            : !eligible
            ? "Offer Inactive"
            : "Get Money Now"
        }
        disabled={!eligible || !accessible}
        onPress={() => {
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
    borderWidth: 1.5,
    borderColor: COLORS.lightgray_01,
    borderRadius: 5,
  },
  text: { ...FONTS.h3, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;
