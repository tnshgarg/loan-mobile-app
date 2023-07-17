import { STAGE } from "@env";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import CmsPastDraws from "../../components/cms/CmsPastDraws";
import CmsScreenOne from "../../components/cms/CmsScreenOne";

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
        component={CmsScreenOne}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsScreenThree"
        component={CmsScreenOne}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsScreenFour"
        component={CmsScreenOne}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsScreenFive"
        component={CmsScreenOne}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsScreenSix"
        component={CmsScreenOne}
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
