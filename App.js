import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { STAGE } from "@env";
import { queryClient } from "./queries/client";
import { QueryClientProvider } from "@tanstack/react-query";
import Analytics from "appcenter-analytics";
import Crashes from "appcenter-crashes";
import codePush from "react-native-code-push";
import { navigationRef } from "./navigators/RootNavigation";
import StackNavigator from "./navigators/StackNavigator";
import { persistor, store } from "./store/store";
import { useState } from "react";
import UpdateDialog from "./components/UpdateDialog";
Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});

// let codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
//   updateDialog: true, //InstallMode.ON_NEXT_RESUME to have minimum background duration effect
// };

const analyticsStatus = async () => {
  STAGE == "dev"
    ? await Analytics.setEnabled(false)
    : await Analytics.setEnabled(true);
  console.log("analyticsStatus", STAGE);
};

const App = () => {
  analyticsStatus();
  SplashScreen.hide();
  const [show, setShow] = useState(false);
  // const [receivedBytes, setReceivedBytes] = useState(0);
  // const [totalBytes, setTotalBytes] = useState(0);
  codePush.sync(
    { updateDialog: true },
    (syncStatus) => {
      switch (syncStatus) {
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log("Downloading package");
          setShow(true);
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log("Installing update");
          break;
        case codePush.SyncStatus.SYNC_IN_PROGRESS:
          console.log("Sync in progress");
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log("Up to date");
          setShow(true);
          break;
      }
    },
    // ({ receivedBytes, totalBytes }) => {
    //   console.log("receivedBytes", receivedBytes);
    //   console.log("totalBytes", totalBytes);
    //   setReceivedBytes(receivedBytes);
    //   if (totalBytes===0){
    //     setTotalBytes(totalBytes);
    //   }
    // }
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
              <IconComponentProvider IconComponent={Icon}>
                <StackNavigator />
                <UpdateDialog open={show}/>
              </IconComponentProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
