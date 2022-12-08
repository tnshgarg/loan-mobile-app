import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/07_drawer/Profile";
import KYCScreen from "../../screens/07_drawer/KYCScreen";

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
    </Stack.Navigator>
  );
};

export default AccountStack;
