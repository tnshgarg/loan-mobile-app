import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/Theme";

export default BottomTabNav = (props) => {
  const bottomTab = createBottomTabNavigator();
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
      })}
    >
      {props.tabs.map((tab, index) => {
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
