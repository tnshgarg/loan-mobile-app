import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CmsNotificationView from "../../components/cms/CmsNotificationView";
import CmsTopTabNav from "../../components/cms/CmsTopTabNav";
import AccountMenu from "../../screens/06_home/Account";
import Profile from "../../screens/06_home/Account/Profile";
import Documents from "../../screens/06_home/Documents/Documents";

const AccountStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"AccountMenu"}>
      <Stack.Screen
        name="AccountMenu"
        component={AccountMenu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KYC"
        component={CmsTopTabNav}
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
      <Stack.Screen
        name="NotificationView"
        component={CmsNotificationView}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
