import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, Octicons } from "react-native-vector-icons";

import Home from "../screens/06_home/Home";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        defaultStatus="open"
        initialRouteName="DrawerHome"
        screenOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 5 },
          headerShown: false,
          drawerActiveBackgroundColor: "#4E46F1",
          drawerActiveTintColor: "white",
        }}
      >
        <Drawer.Screen
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={20} />
            ),
          }}
          name="DrawerHome"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Profile",
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" color={color} size={20} />
            ),
          }}
          name="DrawerProfile"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "KYC",
            drawerIcon: ({ color }) => (
              <Octicons name="verified" color={color} size={20} />
            ),
          }}
          name="DrawerKYC"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Support",
            drawerIcon: ({ color }) => (
              <Ionicons name="chatbox-outline" color={color} size={20} />
            ),
          }}
          name="DrawerSupport"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color }) => (
              <Ionicons name="settings" color={color} size={20} />
            ),
          }}
          name="DrawerSettings"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Privacy Policy",
            drawerIcon: ({ color }) => (
              <Ionicons name="lock-closed-outline" color={color} size={20} />
            ),
          }}
          name="DrawerPrivacyPolicy"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Terms & Conditions",
            drawerIcon: ({ color }) => (
              <Ionicons
                name="ios-shield-checkmark-outline"
                color={color}
                size={20}
              />
            ),
          }}
          name="DrawerTermsConditions"
          component={Home}
        />
      </Drawer.Navigator>
    );
  };

  export default DrawerNavigator;
  