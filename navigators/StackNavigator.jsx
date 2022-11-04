import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DevMenu from "../screens/DevMenu";

import { STAGE } from "@env";
import OfflineAlert from "../components/OfflineAlert";
import OnboardingStack from "./stacks/OnboardingStack";
import HomeStack from "./stacks/HomeStack";
import EWAStack from "./stacks/EWAStack";
import DocumentStack from "./stacks/DocumentStack";
import BenefitsStack from "./stacks/BenefitsStack";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  var initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);

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
