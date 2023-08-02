// RootNavigation.js

import { createNavigationContainerRef } from "@react-navigation/native";
import {
  InteractionTypes,
  trackEvent
} from "../helpers/analytics/commonAnalytics";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef?.current?.isReady()) {
    trackEvent({
      interaction: InteractionTypes.NAVIGATION,
      flow: "navigation",
      screen: `${name}_${params ? params.screen : ""}`,
      action: "navigate",
    });

    navigationRef.navigate(name, params);
  }
}

export function navigateBack() {
  if (navigationRef?.current?.isReady()) {
    navigationRef.goBack();
  }
}
// add other navigation functions that you need and export them
