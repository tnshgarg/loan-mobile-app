import { STAGE } from "@env";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";


import CmsDummyBlog from "../../components/cms/CmsDummyBlog";
import CmsPastDraws from "../../components/cms/CmsPastDraws";

const CmsStack = () => {
  const Stack = createNativeStackNavigator();
  let initialRoute = useSelector((state) => state.navigation.currentScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="CmsDummyBlog"
        component={CmsDummyBlog}
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
