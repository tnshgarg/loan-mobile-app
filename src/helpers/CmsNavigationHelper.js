import axios from "axios";
import Analytics, {
  InteractionTypes,
} from "../helpers/analytics/commonAnalytics";
import { navigationRef } from "../navigators/RootNavigation";
import { EMPLOYEE_API_URL } from "../services/constants";
import { addLanguage } from "../store/slices/localizationSlice";
import { store } from "../store/store";
import { strings } from "./Localization";

const handleLanguageUpdate = async (language) => {
  let content = {};
  if (language) {
    await axios
      .get(`${EMPLOYEE_API_URL}/cms`, {
        params: {
          group: "strings",
          language: language,
        },
      })
      .then(({ data }) => {
        console.log("langgggg: ", data);
        content[language] = data.body.strings;
        strings.setContent(content);
        console.log("Content: ", content);
        console.log("langggg", language);
        store.dispatch(addLanguage(language));
      })
      .catch((e) => console.log("An error occured: ", e));
  }
};

const navigationHelper = async ({ type, stack, screen, language, params }) => {
  params = params || {};
  params = { ...params, language };
  console.log("Paramsd: ", params);
  console.log("screensd: ", params);

  Analytics.trackEvent({
    interaction: InteractionTypes.NAVIGATION,
    flow: "navigation",
    screen: `${stack}_${screen}`,
    action: "navigate",
  });

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
