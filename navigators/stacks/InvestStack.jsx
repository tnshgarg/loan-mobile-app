import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HowItWorks from "../../screens/06_home/Invest/HowItWorks";
import P2P from "../../screens/06_home/Invest/P2P";

const InvestStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"HowItWorks"}>
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
