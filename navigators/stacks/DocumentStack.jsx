import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfflineAlert from "../components/OfflineAlert";
import Documents from "../../screens/06_home/Documents/Documents";

const DocumentStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={"Documents"}>
        <Stack.Screen
          name="Documents"
          component={Documents}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </OfflineAlert>
  );
};

export default DocumentStack;
