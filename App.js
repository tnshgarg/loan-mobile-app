import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  KeyboardAvoidingView,
  LogBox,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "react-native-splash-screen";

import StackNavigator from "./navigators/StackNavigator";
import { store, persistor } from "./store/store";
import Bugsnag from "@bugsnag/react-native";
Bugsnag.start();
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const ErrorView = () => (
  <View>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
);

export default function App() {
  SplashScreen.hide();
  LogBox.ignoreAllLogs();

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
              <IconComponentProvider IconComponent={Icon}>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
                >
                  <StackNavigator />
                </KeyboardAvoidingView>
              </IconComponentProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
