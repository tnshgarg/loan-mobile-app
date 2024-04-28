import { navigate } from "../../navigators/RootNavigation";

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const handleCampaignNavigation = async (
  campaignType,
  campaignScreen,
  navigation,
  initialNavigation,
  onboarded
) => {
  await delay(2000);
  console.log({
    handleCampaignNavigation: { campaignType, campaignScreen, onboarded },
  });
  if (campaignType == "ekyc") {
    navigate("AccountStack", {
      screen: "KYC",
    });
  } else if (campaignType == "onboarding") {
    if (onboarded) {
      navigate("HomeStack", {
        screen: "Home",
      });
      return "ALREADY_ONBOARDED";
    }
    if (campaignScreen == "profile") {
      navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (["aadhaar", "pan", "bank"].includes(campaignScreen)) {
      navigate("AccountStack", {
        screen: "KYC",
        params: { screen: campaignScreen.toUpperCase() },
      });
    }
  } else if (initialNavigation.stack) {
    navigate(initialNavigation.stack, { screen: initialNavigation.screen });
  } else {
    navigate("HomeStack", { screen: "Home" });
  }
  return "SUCCESS";
};
