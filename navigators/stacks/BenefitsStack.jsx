import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STAGE } from "@env";
import { useSelector } from "react-redux";

import Benefits from "../../screens/06_home/Benefits/Benefits";

const BenefitsStack = () => {
  const Stack = createNativeStackNavigator();
  var initialRoute = useSelector((state) => state.navigation.currentScreen);
  
  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Benefits"
        component={Benefits}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BenefitsStack;
