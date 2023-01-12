import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const VerifyMandateCard = ({ mandateVerifyStatus }) => {
  return mandateVerifyStatus === "INPROGRESS" ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Mandate Registration is currently in Progress.
      </Text>
    </View>
  ) : mandateVerifyStatus === "ERROR" ? (
    <View style={styles.errorContainer}>
      <Text style={styles.title}>
        Your Mandate Registration failed, please try again.
      </Text>
    </View>
  ) : null;
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.lightgray_01,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "15rem",
    paddingHorizontal: "5rem",
  },
  errorContainer: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: COLORS.warningBackground,
    borderWidth: 1.5,
    borderColor: COLORS.lightgray_01,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "15rem",
    paddingHorizontal: "5rem",
  },
  title: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: "center",
  },
});

export default VerifyMandateCard;
