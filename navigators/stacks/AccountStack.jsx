import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/06_home/Account/Profile";
import Documents from "../../screens/06_home/Documents/Documents";
import KYCScreen from "../../screens/06_home/Account/KYCScreen";
import Mandate from "../../screens/06_home/Account/Mandate";

const AccountStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"Profile"}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KYC"
        component={KYCScreen}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="Mandate"
        component={Mandate}
        options={{
          headerShown: false,
        }}
      />
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

export default AccountStack;
