import LocalizedStrings from "react-native-localization";
import en from "./strings/en";
import hi from "./strings/hi";

let strings = new LocalizedStrings({
  en: en,
  hi: hi,
});

export { strings };
