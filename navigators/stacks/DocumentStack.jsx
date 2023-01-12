import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STAGE } from "@env";
import { useSelector } from "react-redux";

import Documents from "../../screens/06_home/Documents/Documents";

const DocumentStack = () => {
  const Stack = createNativeStackNavigator();
  var initialRoute = useSelector((state) => state.navigation.currentScreen);
  
  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
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
