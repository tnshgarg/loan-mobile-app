import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../constants/Theme";

const TopTabNav = (props) => {
  const Tab = createMaterialTopTabNavigator();
  const hide = { display: "none", backgroundColor: "white" };
  const show = { backgroundColor: "white" };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: props.hide ? hide : show,
        tabBarPressColor: "purple",
        animationEnabled: true,
        tabBarScrollEnabled: true,
        swipeEnabled: !props.hide,
        lazy: true,
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}
    >
      {props.tabs.map((tab, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            initialParams={tab.initialParams}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TopTabNav;
