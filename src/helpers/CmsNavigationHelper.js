import axios from "axios";
import { navigationRef } from "../navigators/RootNavigation";
import { EMPLOYEE_API_URL } from "../services/constants";
import { addLanguage } from "../store/slices/localizationSlice";
import { store } from "../store/store";
import { changeLanguage } from "./Localization";

const navigationHelper = ({ type, stack, screen, language, params }) => {
  let content = {};
  console.log("guage: ", language);

  if (type == "app") {
    console.log("App navigation triggered!");
    navigationRef.navigate(stack, { screen: screen, params: params });
    if (language) {
      store.dispatch(addLanguage(language));
      axios
        .get(`${EMPLOYEE_API_URL}/cms`, {
          params: {
            group: "strings",
            language: language,
          },
        })
        .then(async ({ data }) => {
          changeLanguage(language);
          console.log("langgggg: ", data);
          content[language] = data.body.strings;
          strings.setContent(content);
          console.log("Content: ", content);
          navigationRef.navigate(stack, { screen: screen, params: params });
        })
        .catch((e) => console.log("An error occured: ", e));
    }
  } else if (type == "cms") {
    console.log("CMS navigation triggered!");
    navigationRef.navigate("CmsStack", {
      screen: "CmsDummyBlog",
      params: params ?? {},
    });
    if (language) {
      store.dispatch(addLanguage(language));
      axios
        .get(`${EMPLOYEE_API_URL}/cms`, {
          params: {
            group: "strings",
            language: language,
          },
        })
        .then(async ({ data }) => {
          changeLanguage(language);
          console.log("langgggg: ", data);
          content[language] = data.body.strings;
          strings.setContent(content);
          console.log("Content: ", content);
          navigationRef.navigate("CmsStack", {
            screen: "CmsDummyBlog",
            params: params ?? {},
          });
        })
        .catch((e) => console.log("An error occured: ", e));
    }
  } else {
    console.log("Navigation Type Invalid!");
  }
};

export { navigationHelper };
