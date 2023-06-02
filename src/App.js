import { STAGE } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import Crashes from "appcenter-crashes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import UpdateDialog from "./components/UpdateDialog";
import { navigationRef } from "./navigators/RootNavigation";
import StackNavigator from "./navigators/StackNavigator";
import { persistor, store } from "./store/store";

Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});

const App = () => {
  SplashScreen.hide();
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
