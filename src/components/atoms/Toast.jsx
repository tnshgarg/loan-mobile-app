import Snackbar from "react-native-snackbar";
import { COLORS } from "../../constants/Theme";

const BACKGROUND_COLOR = {
  success: COLORS.primaryBackground,
  pending: COLORS.pending,
};
const TEXT_COLOR = { success: COLORS.primary, pending: COLORS.white };

export const showToast = (message, type) => {
  console.log({ message });

  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    fontFamily: "Montserrat-Medium",
    textColor: TEXT_COLOR[type] || COLORS.warning,
    backgroundColor: BACKGROUND_COLOR[type] || COLORS.warningBackground,
  });
};
