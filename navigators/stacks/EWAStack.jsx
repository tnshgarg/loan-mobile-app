import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EWA from "../../screens/06_home/Money/EWA/EWA";
import Offer from "../../screens/06_home/Money/EWA/01_Offer";
import KYC from "../../screens/06_home/Money/EWA/02_Kyc";
import Agreement from "../../screens/06_home/Money/EWA/03_Agreement";
import Disbursement from "../../screens/06_home/Money/EWA/04_Disbursement";
import OfflineAlert from "../../components/OfflineAlert";

const EWAStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ animation: "slide_from_right" }}
      initialRouteName={"EWA"}
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
