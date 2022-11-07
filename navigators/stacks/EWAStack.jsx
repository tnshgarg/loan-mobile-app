import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STAGE } from "@env";
import { useSelector } from "react-redux";

import EWA from "../../screens/06_home/Money/EWA/EWA";
import Offer from "../../screens/06_home/Money/EWA/01_Offer";
import KYC from "../../screens/06_home/Money/EWA/02_Kyc";
import Agreement from "../../screens/06_home/Money/EWA/03_Agreement";
import Disbursement from "../../screens/06_home/Money/EWA/04_Disbursement";

const EWAStack = () => {
  const Stack = createNativeStackNavigator();
  var initialRoute = useSelector((state) => state.navigation.currentScreen);
  
  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      screenOptions={{ animation: "slide_from_right" }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen
        name="EWA"
        component={EWA}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWA_OFFER"
        component={Offer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWA_KYC"
        component={KYC}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWA_AGREEMENT"
        component={Agreement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EWA_DISBURSEMENT"
        component={Disbursement}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default EWAStack;
