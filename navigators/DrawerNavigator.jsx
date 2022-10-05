import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, Octicons } from "react-native-vector-icons";

import Home from "../screens/06_home/Home";
import CustomDrawer from "../components/CustomDrawer";
import Profile from "../screens/07_drawer/Profile";
import KYCScreen from "../screens/07_drawer/KYCScreen";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { Image } from "react-native";
import { nav } from "../styles";
import { COLORS } from "../constants/Theme";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      defaultStatus="closed"
      initialRouteName="DrawerHome"
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
        headerShown: true,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: "white",
        header: ({ navigation }) => (
          <AppBar
            title={
              <Image
                style={nav.titleLogo}
                source={require("../assets/unipe-Thumbnail.png")}
              />
            }
            centerTitle={true}
            contentContainerStyle={nav.navbar}
            color="#ffffff"
            leading={
              <IconButton
                icon={<Icon name="menu" size={30} />}
                onPress={() => {
                  console.log("Menu");
                  navigation.toggleDrawer();
                }}
              />
            }
            trailing={<IconButton icon={<Icon name="more-vert" size={30} />} />}
          />
        ),
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
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "KYC",
          drawerIcon: ({ color }) => (
            <Octicons name="verified" color={color} size={20} />
          ),
        }}
        name="DrawerKYC"
        component={KYCScreen}
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
