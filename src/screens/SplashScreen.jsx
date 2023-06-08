import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";
import Analytics, { InteractionTypes } from "../helpers/analytics/commonAnalytics";
import { Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addOnboardingCampaignId } from "../store/slices/campaignSlice";
import { addCurrentStack } from "../store/slices/navigationSlice";
import * as RootNavigation from "../navigators/RootNavigation"
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

}
const delay = (ms) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}
const SplashScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onboarded = useSelector((state) => state.auth.onboarded);
  let campaignId = useSelector((state) => state?.campaign?.onboardingCampaignId)

  const navigateHome = () => navigation.navigate("HomeStack", {screen: "Home"})
  const navigateInitialRoute = async () => {
    await delay(2000);
    const {initialRoute, initialScreen} = props?.route?.params
    if (initialRoute && navigation.replace)
      navigation.navigate(initialRoute,{screen: initialScreen})
    else
      navigateHome();
  }

  useEffect(() => {    
    navigateInitialRoute();
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
