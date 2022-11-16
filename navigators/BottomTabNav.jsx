import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TopAppBar from "../components/molecules/TopAppBar";
import { COLORS, FONTS } from "../constants/Theme";
import Benefits from "../screens/06_home/Benefits/Benefits";
import Documents from "../screens/06_home/Documents/Documents";
import HomeView from "../screens/06_home/HomeView";
import EWANavigator from "./EWANavigator";

export default BottomTabNav = () => {
  const bottomTab = createBottomTabNavigator();
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: EWANavigator },
  ];
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { ...FONTS.h5, marginBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Documents":
              iconName = focused
                ? "clipboard-account"
                : "clipboard-account-outline";
              break;
            case "Benefits":
              iconName = focused ? "plus-thick" : "plus-outline";
              break;
            case "Money":
              iconName = focused ? "currency-inr" : "currency-inr";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        header: TopAppBar,
      })}
    >
      {tabs.map((tab, index) => {
        return (
          <bottomTab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
          />
        );
      })}
    </bottomTab.Navigator>
  );
};
