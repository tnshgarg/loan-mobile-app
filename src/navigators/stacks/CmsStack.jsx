import { STAGE } from "@env";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";


import CmsDummy2 from "../../components/cms/CmsDummy2";
import CmsDummy3 from "../../components/cms/CmsDummy3";
import CmsDummyBlog from "../../components/cms/CmsDummyBlog";

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
        name="CmsDummy2"
        component={CmsDummy2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CmsDummy3"
        component={CmsDummy3}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CmsStack;
