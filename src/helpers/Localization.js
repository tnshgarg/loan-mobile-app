/* eslint-disable quotes */
import LocalizedStrings from "react-native-localization";
import english from "./strings/en";
import hindi from "./strings/hi";

let strings = new LocalizedStrings({
  en: english,
  hi: hindi,
});

const changeLanguage = (languageKey) => {
  strings.setLanguage(languageKey);
};

export { changeLanguage, strings };
