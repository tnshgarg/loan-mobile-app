import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "react-native-splash-screen";

import StackNavigator from "./navigators/StackNavigator";
import { store, persistor } from "./store/store";
import codePush from "react-native-code-push";
import Crashes from "appcenter-crashes";
import Analytics from "appcenter-analytics";

Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});
Analytics.startSession();
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE, //InstallMode.ON_NEXT_RESUME to have minimum background duration effect
};

const App = () => {
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
            <IconComponentProvider IconComponent={Icon}>
              <StackNavigator />
            </IconComponentProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
