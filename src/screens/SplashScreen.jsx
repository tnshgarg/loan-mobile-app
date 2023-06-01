import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";
import Analytics, { InteractionTypes } from "../helpers/analytics/commonAnalytics";
import { Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addOnboardingCampaignId } from "../store/slices/campaignSlice";
import { addCurrentStack } from "../store/slices/navigationSlice";

const extractPathParams = (initialUrl) => {
  const splitUrl = initialUrl.split("/");
  let campaignId = null;
  const campaignParamIndex = splitUrl.indexOf("campaign")    
  if (campaignParamIndex > -1 && campaignParamIndex < splitUrl.length -1) {
    campaignId = splitUrl[campaignParamIndex+1]
  }
  console.log({campaignId})
  const campaignType = splitted[3].toLowerCase()
  const campaignScreen = splitted[4]?.toLowerCase()
  return {
    "utm_campaign": campaignId,
    "unip_type": campaignType,
    "unipe_screen": campaignScreen
  }
}

const extractQueryParams = (url) => {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  return params
}
const handleOnboardedUser = (navigation,initialUrl) => {
  Analytics.setSessionValue("campaignClick", initialUrl)
  Analytics.trackEvent({
    interaction: InteractionTypes.CAMPAIGN_URL,
    component: "Onboarding",
    action: "campaign_url_open",
    status: "already_onboarded",
  })
  navigation.navigate("HomeStack", {
    screen: "Home",
  })
}

const SplashScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onboarded = useSelector((state) => state.auth.onboarded);
  let campaignId = useSelector((state) => state?.campaign?.onboardingCampaignId)

  const navigateHome = () => navigation.navigate("HomeStack", {screen: "Home"})
  const navigateInitialRoute = () => {
    const initialRoute = props?.route?.params?.initialRoute
    if(initialRoute)
      navigation.replace(initialRoute);
    else 
      navigateHome();
  }
  
  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    
    if (initialUrl) {
      let params = {}
      if(initialUrl.includes("?")) {
        params = extractQueryParams(initialUrl)
      } else {
        params = extractPathParams(initialUrl)
      }
      Analytics.setSessionValue("campaignClick", initialUrl)
      dispatch(addOnboardingCampaignId(params["utm_campaign"]));
      
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "Onboarding",
        action: "campaign_url_open",
        status: "started",
      })
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);

      if (campaignType == "onboarding"){
        if(onboarded) {
          handleOnboardedUser(navigation, initialUrl)
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
      }
    }
    console.log("No intent. User opened App.");
    console.log("campaignId", campaignId);
    navigateInitialRoute();
  };

  useEffect(() => {
    getUrlAsync();
  }, []);

  return (
    <Image
      source={require("../assets/splash_screen.png")}
      style={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
});

export default SplashScreen;
