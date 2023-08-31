import { Alert } from "react-native";
import { navigate } from "../navigators/RootNavigation";
import { store } from "../store/store";


let LOGOUT_ALERT_OPEN = false;

const handle401Alert = () => {
    if (!LOGOUT_ALERT_OPEN) {
        LOGOUT_ALERT_OPEN = true
        Alert.alert("Session expired", "Logging you out!", [
            {
                title: "ok",
                onPress: () => {
                    LOGOUT_ALERT_OPEN = false;
                    navigate("Login")
                }
            }
        ]);
    }
    store.dispatch({ type: "LOGOUT" });
}
const AlertHandler = {
    handle401Alert
}

export default AlertHandler;