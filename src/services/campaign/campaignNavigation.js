export const handleCampaignNavigation = async (campaignType, campaignScreen, navigation, initialNavigation, onboarded) => {
    console.log({handleCampaignNavigation: {navigation, campaignType}})
    if (campaignType == "ekyc") {
        navigation.navigate("AccountStack", {
            screen: "KYC",
        });
    } else if (campaignType == "onboarding") {
        if (onboarded) {
            return "ALREADY_ONBOARDED";
        }
        if (campaignScreen == "profile") {
            navigation.navigate("AccountStack", {
              screen: "Profile",
            })
          } else if (["aadhaar","pan","bank"].includes(campaignScreen)) {
            navigation.navigate("AccountStack", {
              screen: "KYC",
              params: { screen: campaignScreen.toUpperCase() },
            })
          }
    } else if (initialNavigation.stack) {
        navigation.navigate(initialNavigation.stack, {screen: initialNavigation.screen});
    } else {
        navigation.navigate("HomeStack", {screen: "Home"})
    }
    return "SUCCESS"
}