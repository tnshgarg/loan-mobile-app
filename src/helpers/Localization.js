/* eslint-disable quotes */
import LocalizedStrings from "react-native-localization";
import { addLanguage } from "../store/slices/localizationSlice";
import { store } from "../store/store";
import en from "./strings/en";
import hi from "./strings/hi";

console.log("Localization.js: ", store.getState().localization.strings);

let strings = new LocalizedStrings({
  en: en,
  hi: hi,
});

const changeLanguage = (languageKey) => {

  store.dispatch(addLanguage(languageKey));
  strings.setLanguage(languageKey);
};

export { changeLanguage, strings };
