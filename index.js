/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import "react-native-gesture-handler";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.tron.log("Recieved in Background", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
