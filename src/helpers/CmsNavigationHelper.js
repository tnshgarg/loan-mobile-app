import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CodePush from "react-native-code-push";
import Analytics from "../helpers/analytics/commonAnalytics";
import { navigationRef } from "../navigators/RootNavigation";
import { EMPLOYEE_API_URL } from "../services/constants";
import { addLanguage } from "../store/slices/localizationSlice";
import { store } from "../store/store";
import { strings } from "./Localization";
import {cmsApi} from "../store/apiSlices/cmsApi";

export const handleLanguageUpdate = async (language) => {
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
        content[language] = data.body.strings;
        strings.setContent(content);
        AsyncStorage.setItem("langData", content);
        store.dispatch(cmsApi.util.resetApiState()); 
        store.dispatch(addLanguage(language));
        if (!store.getState()?.auth?.loggedOut)
          CodePush.restartApp()
      })
      .catch((e) => console.log("An error occured: ", e));
  }
};

const cmsScreenMap = {
  1: "CmsScreenOne",
  2: "CmsScreenTwo",
  3: "CmsScreenThree",
};
const navigationHelper = async ({
  type,
  stack,
  screen,
  language,
  params,
  analytics,
}) => {
  params = params || {};
  params = { ...params, language };
  console.log("Paramsd: ", params);
  console.log("screensd: ", params);

  if (analytics) Analytics.trackEvent(analytics);

  await handleLanguageUpdate(language);
  if (type == "app") {
    if (stack) {
      navigationRef.navigate(stack, { screen: screen, params: params });
    } else {
      navigationRef.navigate(screen, { params: params });
    }
  } else if (type == "cms") {
    console.log("CMS navigation triggered!", {
      screen: "CmsScreenOne",
      params: params ?? {},
    });
    if (screen) {
      navigationRef.navigate("CmsStack", {
        screen: cmsScreenMap[screen],
        params: params ?? {},
      });
    } else {
      navigationRef.navigate("CmsStack", {
        screen: "CmsScreenOne",
        params: params ?? {},
      });
    }
  } else if (type == "cmsScreenTwo") {
    console.log("CMS nest navigation triggered!");
    navigationRef.navigate("CmsStack", {
      screen: "CmsScreenTwo",
      params: params ?? {},
    });
  } else if (type == "cmsScreenThree") {
    console.log("CMS 3 nest navigation triggered!");
    navigationRef.navigate("CmsStack", {
      screen: "cmsScreenThree",
      params: params ?? {},
    });
  } else if (type == "back") {
    navigationRef.goBack();
  } else {
    console.log("Navigation Type Invalid!");
  }
};

export { navigationHelper };
