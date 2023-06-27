import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/Theme";
import HomeView from "../screens/06_home/HomeView";
import AccountStack from "./stacks/AccountStack";
import EWAStack from "./stacks/EWAStack";
import InvestStack from "./stacks/InvestStack";
import Home from "../assets/icons/Home.svg";
import HomeActive from "../assets/icons/HomeActive.svg";
import Account from "../assets/icons/Account.svg";
import AccountActive from "../assets/icons/AccountActive.svg";
import Money from "../assets/icons/Money.svg";
import MoneyActive from "../assets/icons/MoneyActive.svg";

export default BottomTabNav = () => {
  const bottomTab = createBottomTabNavigator();
  const tabs = [
    { name: "Home", component: HomeView },
    // { name: "Invest", component: InvestStack },
    // { name: "Benefits", component: Benefits },
    { name: "Money", component: EWAStack },
    { name: "Account", component: AccountStack },
  ];
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 55 },
        tabBarLabelStyle: {
          ...FONTS.body5,
          marginBottom: 5,

          color: COLORS.secondary,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? <HomeActive /> : <Home />;
              break;
            // case "Invest":
            //   iconName = focused ? <Home /> : <Home />;
            //   break;
            // case "Benefits":
            //   iconName = focused ? <Home /> : <Home />;
            //   break;
            case "Money":
              iconName = focused ? <MoneyActive /> : <Money />;
              break;
            case "Account":
              iconName = focused ? <AccountActive /> : <Account />;
              break;
          }
          return iconName;
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
