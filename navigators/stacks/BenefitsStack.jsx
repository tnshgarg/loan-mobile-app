import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfflineAlert from "../components/OfflineAlert";
import Benefits from "../../screens/06_home/Benefits/Benefits";

const BenefitsStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={"Benefits"}>
        <Stack.Screen
          name="Benefits"
          component={Benefits}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </OfflineAlert>
  );
};

export default BenefitsStack;
