import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking } from "react-native";
import DevMenu from "../screens/DevMenu";
import { addCampaignId } from "../store/slices/authSlice";
import {
  addCurrentStack,
  addCurrentScreen,
} from "../store/slices/navigationSlice";

import { STAGE } from "@env";
import OfflineAlert from "../components/organisms/OfflineAlert";
import OnboardingStack from "./stacks/OnboardingStack";
import HomeStack from "./stacks/HomeStack";
import EWAStack from "./stacks/EWAStack";
import DocumentStack from "./stacks/DocumentStack";
import BenefitsStack from "./stacks/BenefitsStack";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  var [initialRoute, setInitialRoute] = useState(
    useSelector((state) => state.navigation.currentStack)
  );
  var [initialScreen, setInitialScreen] = useState(
    useSelector((state) => state.navigation.currentScreen)
  );
  var [campaignId, setCampaignId] = useState(null);

  useEffect(() => {
    dispatch(addCampaignId(campaignId));
  }, [campaignId]);

  useEffect(() => {
    dispatch(addCurrentStack(initialRoute));
  }, [initialRoute]);

  useEffect(() => {
    dispatch(addCurrentScreen(initialScreen));
  }, [initialScreen]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl) {
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      switch (splitted[3].toLowerCase()) {
        case "ewa":
          setInitialRoute("EWAStack");
          break;
        case "home":
          setInitialRoute("HomeStack");
          break;
      }
      switch (splitted[4].toLowerCase()) {
        case "campaign":
          console.log("campaignId", splitted[5]);
          setCampaignId(splitted[5]);
          break;
        default:
          break;
      }
    } else {
      console.log("No intent. User opened App.");
      setInitialRoute("HomeStack");
    }
  };

  useEffect(() => {
    getUrlAsync();
  }, []);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);
  console.log("currentScreen: ", initialScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="DevMenu"
          component={DevMenu}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="OnboardingStack"
          component={OnboardingStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EWAStack"
          component={EWAStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DocumentStack"
          component={DocumentStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BenefitsStack"
          component={BenefitsStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </OfflineAlert>
  );
};

export default StackNavigator;
