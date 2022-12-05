import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, Octicons } from "react-native-vector-icons";
import Placeholder from "../screens/06_home/Placeholder";
import Profile from "../screens/07_drawer/Profile";
import KYCScreen from "../screens/07_drawer/KYCScreen";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import SVGImg from "../assets/UnipeLogo.svg";
import { nav } from "../styles";
import { COLORS, FONTS } from "../constants/Theme";
import CustomDrawer from "./CustomDrawer";
import BottomTabNav from "./BottomTabNav";
import TopAppBar from "../components/molecules/TopAppBar";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      defaultStatus="closed"
      initialRouteName="DrawerHome"
      screenOptions={{
        itemStyle: { marginVertical: 5 },
        headerShown: true,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: "white",
        drawerLabelStyle: { ...FONTS.body4 },

        header: ({ navigation }) => (
          <AppBar
            title={<SVGImg />}
            centerTitle={true}
            contentContainerStyle={nav.navbar}
            color="#ffffff"
            leading={
              <IconButton
                accessibilityLabel="NavigationDrawer"
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
            <View accessibilityLabel="HomeIcon">
              <Ionicons name="home" color={color} size={20} />
            </View>
          ),
          // headerShown: false,
          header: TopAppBar,
        }}
        name="DrawerHome"
        component={BottomTabNav}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color }) => (
            <View accessibilityLabel="ProfileIcon">
              <Ionicons name="person-outline" color={color} size={20} />
            </View>
          ),
        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "KYC",
          drawerIcon: ({ color }) => (
            <View accessibilityLabel="KYCIcon">
              <Octicons name="verified" color={color} size={20} />
            </View>
          ),
        }}
        name="KYC"
        component={KYCScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color }) => (
            <View accessibilityLabel="SettingsIcon">
              <Ionicons name="settings" color={color} size={20} />
            </View>
          ),
          headerShown: true,
        }}
        name="DrawerSettings"
        component={Placeholder}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
