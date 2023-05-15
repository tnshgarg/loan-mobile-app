import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "./queries/client";
import { QueryClientProvider } from "@tanstack/react-query";
import Analytics from "appcenter-analytics";
import Crashes from "appcenter-crashes";
import { navigationRef } from "./navigators/RootNavigation";
import StackNavigator from "./navigators/StackNavigator";
import { persistor, store } from "./store/store";
import UpdateDialog from "./components/UpdateDialog";
import { STAGE } from "@env";

Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});

const analyticsStatus = async () => {
  Analytics.setEnabled(true);
  const enabled = await Analytics.isEnabled();
  console.log("Analytics.isEnabled", enabled);
};

const App = () => {
  analyticsStatus();
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
              <StackNavigator />
              {STAGE != "dev" && <UpdateDialog />}
            </SafeAreaProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
