import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STAGE } from "@env";
import { useSelector } from "react-redux";

import DrawerNavigator from "../DrawerNavigator";
import KYCScreen from "../../screens/07_drawer/KYCScreen";
import Profile from "../../screens/07_drawer/Profile";
import Documents from "../../screens/06_home/Documents/Documents";
import Benefits from "../../screens/06_home/Benefits/Benefits";
import EWA from "../../screens/06_home/Money/EWA/EWA";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  var initialRoute = useSelector((state) => state.navigation.currentScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="KYC"
        component={KYCScreen}
        options={{
          headerShown: true,
          headerTitle: "KYC Details",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: "Profile Details",
        }}
      />
      <Stack.Screen
        name="Documents"
        component={Documents}
        options={{
          headerShown: true,
          headerTitle: "Documents",
        }}
      />
      <Stack.Screen
        name="Benefits"
        component={Benefits}
        options={{
          headerShown: true,
          headerTitle: "Benefits",
        }}
      />
      <Stack.Screen
        name="Money"
        component={EWA}
        options={{
          headerShown: true,
          headerTitle: "Get Advanced Salary",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
