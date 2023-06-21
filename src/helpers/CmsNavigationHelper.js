import axios from "axios";
import { navigationRef } from "../navigators/RootNavigation";
import { EMPLOYEE_API_URL } from "../services/constants";
import { addLanguage } from "../store/slices/localizationSlice";
import { store } from "../store/store";
import { changeLanguage, strings } from "./Localization";

const handleLanguageUpdate = async (language) => {
  if(language) {
    store.dispatch(addLanguage(language));
    await axios.get(`${EMPLOYEE_API_URL}/cms`, {
      params: {
        group: "strings",
        language: language,
      },
    }).then(async ({ data }) => {
      changeLanguage(language);
      console.log("langgggg: ", data);
      content[language] = data.body.strings;
      strings.setContent(content);
      console.log("Content: ", content);
    }).catch((e) => console.log("An error occured: ", e));
  }
};
const navigationHelper = async ({ type, stack, screen, language, params }) => {
  let content = {};
  console.log("guage: ", language);
  await handleLanguageUpdate(language);
  if (type == "app") {
    if (stack) {
      navigationRef.navigate(stack, { screen: screen, params: params });
    } else {
      navigationRef.navigate(screen, { params: params });
    }
  } else if (type == "cms") {
    console.log("CMS navigation triggered!");
    navigationRef.navigate("CmsStack", {
      screen: "CmsDummyBlog",
      params: params ?? {},
    });
  } else {
    console.log("Navigation Type Invalid!");
  }
};

export { navigationHelper };
