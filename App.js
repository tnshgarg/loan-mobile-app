import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "react-native-splash-screen";

import StackNavigator from "./navigators/StackNavigator";
import { store, persistor } from "./store/store";
import codePush from "react-native-code-push";
import Crashes from "appcenter-crashes";
import { navigationRef } from "./navigators/RootNavigation";
import Analytics from "appcenter-analytics";
import { STAGE } from "@env";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/index";

Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true, //InstallMode.ON_NEXT_RESUME to have minimum background duration effect
};

const analyticsStatus = async () => {
  STAGE == "dev"
    ? await Analytics.setEnabled(false)
    : await Analytics.setEnabled(true);
  console.log("analyticsStatus", STAGE);
};

const App = () => {
  SplashScreen.hide();
  analyticsStatus();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
              <IconComponentProvider IconComponent={Icon}>
                <StackNavigator />
              </IconComponentProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
