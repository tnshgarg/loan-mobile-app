import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HowItWorks from "../../screens/06_home/Invest/HowItWorks";
import Invest from "../../screens/06_home/Invest/Invest";
import P2P from "../../screens/06_home/Invest/P2P";

const InvestStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"InvestNow"}>
      <Stack.Screen
        name="InvestNow"
        component={Invest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="P2P"
        component={P2P}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default InvestStack;
