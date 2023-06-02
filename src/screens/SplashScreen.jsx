import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, Linking, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addOnboardingCampaignId } from "../store/slices/campaignSlice";
import remoteConfig from '@react-native-firebase/remote-config';

const SplashScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onboarded = useSelector((state) => state.auth.onboarded);
  let [campaignId, setCampaignId] = useState(
    useSelector((state) => state.campaign.onboardingCampaignId)
  );
    
  useEffect(() => {
    dispatch(addOnboardingCampaignId(campaignId));
  }, [campaignId]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl && !onboarded) {
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      switch (splitted[3].toLowerCase()) {
        case "onboarding":
          switch (splitted[4]?.toLowerCase()) {
            case "profile":
              navigation.navigate("AccountStack", {
                screen: "Profile",
              });
              break;
            case "aadhaar":
              navigation.navigate("AccountStack", {
                screen: "KYC",
                params: { screen: "AADHAAR" },
              });
              break;
            case "pan":
              navigation.navigate("AccountStack", {
                screen: "KYC",
                params: { screen: "PAN" },
              });
              break;
            case "bank":
              navigation.navigate("AccountStack", {
                screen: "KYC",
                params: { screen: "BANK" },
              });
              break;
          }
          break;
        default:
          break;
      }
      switch (splitted[5]?.toLowerCase()) {
        case "campaign":
          console.log("campaignId", splitted[6]);
          setCampaignId(splitted[6]);
          break;
        default:
          // navigation.replace(props.route.params.initialRoute);
          break;
      }
    } else {
      console.log("No intent. User opened App.");
      console.log("campaignId", campaignId);
      // navigation.replace(props.route.params.initialRoute);
    }
  };

  useEffect(() => {
    console.log("useEffectSplash")
    getUrlAsync();
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.', fetchedRemotely);
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
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
