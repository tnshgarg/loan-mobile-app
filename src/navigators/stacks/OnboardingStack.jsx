import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/00_login/LoginScreen";
import OTPScreen from "../../screens/00_login/OTPScreen";
import LoginSuccess from "../../screens/00_login/LoginSuccess";
import BackendSync from "../../screens/BackendSync";
import Onboarding from "../../screens/00_login/Onboarding";

const OnboardingStack = () => {
  const Stack = createNativeStackNavigator();
  var initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      screenOptions={{ animation: "slide_from_right" }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BackendSync"
        component={BackendSync}
        options={{
          headerShown: false,
          animation: "default",
        }}
      />
      <Stack.Screen
        name="LoginSuccess"
        component={LoginSuccess}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
