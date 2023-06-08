import Reactotron, { trackGlobalErrors } from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reactotronRedux } from "reactotron-redux";

function setupReactotronLog() {
  console.log = Reactotron.log;
  console.log = Reactotron.error;
  console.warn = Reactotron.warn;
}

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(trackGlobalErrors())

  .connect();
setupReactotronLog();
Reactotron.clear();

export default reactotron;
