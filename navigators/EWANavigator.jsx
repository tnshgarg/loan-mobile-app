import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EWA from "../screens/06_home/Money/EWA/EWA";
import Offer from "../screens/06_home/Money/EWA/01_Offer";
import KYC from "../screens/06_home/Money/EWA/02_Kyc";
import Mandate from "../screens/06_home/Money/EWA/03_Mandate";
import Agreement from "../screens/06_home/Money/EWA/04_Agreement";
import Disbursement from "../screens/06_home/Money/EWA/05_Disbursement";


const EWANavigator = () => {

  const initialRoute = useSelector((state) => state.navigation.currentScreen);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
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
        name="EWA_MANDATE"
        component={Mandate}
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
