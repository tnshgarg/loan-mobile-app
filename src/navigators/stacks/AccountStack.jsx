import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CmsNotificationView from "../../components/cms/CmsNotificationView";
import CmsTopTabNav from "../../components/cms/CmsTopTabNav";
import AccountMenu from "../../screens/06_home/Account";
import KYCScreen from "../../screens/06_home/Account/KYCScreen";
import Profile from "../../screens/06_home/Account/Profile";
import Documents from "../../screens/06_home/Documents/Documents";
import SubmitFeedback from "../../screens/06_home/UserStory/01_SubmitYourFeedback";
import UploadFeedback from "../../screens/06_home/UserStory/02_UploadFeedback";


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
        component={KYCScreen}
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
      <Stack.Screen
        name="TabsScreen"
        component={CmsTopTabNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubmitFeedback"
        component={SubmitFeedback}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadFeedback"
        component={UploadFeedback}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
