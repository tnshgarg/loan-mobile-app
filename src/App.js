import { STAGE } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import Crashes from "appcenter-crashes";
import { useEffect } from "react";
import { AppState, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import UpdateDialog from "./components/UpdateDialog";
import Analytics, {
  InteractionTypes,
} from "./helpers/analytics/commonAnalytics";
import { navigationRef } from "./navigators/RootNavigation";
import StackNavigator from "./navigators/StackNavigator";
import { persistor, store } from "./store/store";
Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});

// if (__DEV__) {
//   import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
// }
const analyticsInit = async () => {
  await Analytics.init();
  
};

const App = () => {
  analyticsInit();
  SplashScreen.hide();

  LogBox.ignoreAllLogs();

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === "active") {
        // App is in the foreground
        console.log("App is in the foreground");
        await Analytics.trackEvent({
          interaction: InteractionTypes.SCREEN_OPEN,
          flow: "appState",
          screen: "root",
          action: "FOREGROUND",
        });
      } else {
        // App is in the background
        console.log("App is in the background");
        await Analytics.trackEvent({
          interaction: InteractionTypes.APP_CLOSED,
          flow: "appState",
          screen: "root",
          action: "BACKGROUND",
        });
      }
    };

    AppState.addEventListener("change", handleAppStateChange);

    // Clean up the event listener on unmount
    return () => {
      // AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []); // Empty dependency array to only run once

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
            <StackNavigator />
            {STAGE != "dev" && <UpdateDialog />}
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
