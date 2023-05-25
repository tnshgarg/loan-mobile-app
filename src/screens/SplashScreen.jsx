import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import Analytics, { InteractionTypes } from "../helpers/analytics/commonAnalytics";
import { Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addOnboardingCampaignId } from "../store/slices/campaignSlice";
import { addCurrentStack } from "../store/slices/navigationSlice";

const SplashScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onboarded = useSelector((state) => state.auth.onboarded);
  var [campaignId, setCampaignId] = useState(
    useSelector((state) => state.campaign.onboardingCampaignId)
  );

  useEffect(() => {
    dispatch(addOnboardingCampaignId(campaignId));
  }, [campaignId]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl) {
      Analytics.setSessionValue("campaignClick", initialUrl)
      Analytics.trackEvent({
        interaction: InteractionTypes.CAMPAIGN_URL,
        component: "Onboarding",
        action: "campaign_url_open",
        status: "started",
      })
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      const campaignParamIndex = splitted.indexOf("campaign")
      
      if (campaignParamIndex > -1 && campaignParamIndex < splitted.length) {
        setCampaignId(splitted[campaignParamIndex+1])
      }

      if(onboarded) {
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

      if (splitted[3].toLowerCase() == "onboarding"){
        switch (splitted[4]?.toLowerCase()) {
          case "profile":
            navigation.navigate("AccountStack", {
              screen: "Profile",
            })
            break;
          case "aadhaar":
            navigation.navigate("AccountStack", {
              screen: "KYC",
              params: { screen: "AADHAAR" },
            })
            break;
          case "pan":
            navigation.navigate("AccountStack", {
              screen: "KYC",
              params: { screen: "PAN" },
            })
            break;
          case "bank":
            navigation.navigate("AccountStack", {
              screen: "KYC",
              params: { screen: "BANK" },
            })
            break;
        }
      } else {
        navigation.replace(props.route.params.initialRoute);
      }
    } else {
      console.log("No intent. User opened App.");
      console.log("campaignId", campaignId);
      navigation.replace(props.route.params.initialRoute);
    }
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
