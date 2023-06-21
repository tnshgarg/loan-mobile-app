import { navigationRef } from "../navigators/RootNavigation";

const navigationHelper = ({ type, stack, screen, params }) => {
  if (type == "app") {
    console.log("App navigation triggered!");
    if (stack)
      navigationRef.navigate(stack, { screen: screen, params: params });
    else navigationRef.navigate(screen, { params: params });
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
