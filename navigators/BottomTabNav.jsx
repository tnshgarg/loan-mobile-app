import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/Theme";
import Account from "../screens/06_home/Account";
import Benefits from "../screens/06_home/Benefits/Benefits";
import HomeView from "../screens/06_home/HomeView";
import Invest from "../screens/06_home/Invest/Invest";
import EWA from "../screens/06_home/Money/EWA/EWA";

export default BottomTabNav = () => {
  const bottomTab = createBottomTabNavigator();
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Invest", component: Invest },
    // { name: "Benefits", component: Benefits },
    { name: "Money", component: EWA },
    { name: "Account", component: Account },
  ];
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { ...FONTS.body5, marginBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Invest":
              iconName = focused ? "cash-multiple" : "cash-multiple";
              break;
            case "Benefits":
              iconName = focused ? "crown" : "crown-outline";
              break;
            case "Money":
              iconName = focused ? "currency-inr" : "currency-inr";
              break;
            case "Account":
              iconName = focused ? "account-circle" : "account-circle-outline";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
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
