import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/react-native";

export default BugSnagNotify = (props) => {
  const mobileNumber = useSelector((state) => state.auth.phoneNumber);
  const currentScreen = useSelector((state) => state.navigation.currentScreen);

  Bugsnag.notify(
    new Error(`${mobileNumber} - ${currentScreen} - ${props.text}`)
  );
};
