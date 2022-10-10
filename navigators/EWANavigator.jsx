import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STAGE } from "@env";
import Offer from "../screens/06_home/Money/EWA/01_Offer";
import EWA from "../screens/06_home/Money/EWA/EWA";
import Agreement from "../screens/06_home/Money/EWA/03_Agreement";
import Disbursement from "../screens/06_home/Money/EWA/04_Disbursement";
import KYC from "../screens/06_home/Money/EWA/02_Kyc";

const EWANavigator = () => {
  const Stack = createNativeStackNavigator();

  const initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      initialRouteName={STAGE === "dev" ? "DevMenu" : initialRoute}
      screenOptions={{ headerShown: false }}
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

export default EWANavigator;
