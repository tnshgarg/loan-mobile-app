import Snackbar from "react-native-snackbar";
import { COLORS } from "../../constants/Theme";

export const showToast = (message, type) => {
  Snackbar.show({
    text: message.toUpperCase(),
    duration: Snackbar.LENGTH_LONG,
    fontFamily: "Montserrat-Medium",
    backgroundColor:
      type === "success"
        ? COLORS.primary
        : type === "pending"
        ? COLORS.pending
        : COLORS.warning,
  });
};
