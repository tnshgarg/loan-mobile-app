import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Documents from "../../screens/06_home/Documents/Documents";

const DocumentStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"Documents"}>
      <Stack.Screen
        name="Documents"
        component={Documents}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DocumentStack;
