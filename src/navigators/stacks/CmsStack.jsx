import { STAGE } from "@env";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import CmsPastDraws from "../../components/cms/CmsPastDraws";
import CmsScreenOne from "../../components/cms/CmsScreenOne";
import CmsScreenTwo from "../../components/cms/CmsScreenTwo";

const CmsStack = () => {
  const Stack = createNativeStackNavigator();
  let initialRoute = useSelector((state) => state.navigation.currentScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="CmsScreenOne"
        component={CmsScreenOne}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsScreenTwo"
        component={CmsScreenTwo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsPastDraws"
        component={CmsPastDraws}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CmsStack;
