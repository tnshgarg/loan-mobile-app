import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, FONTS } from "../constants/Theme";

const TopTabNav = (props) => {
  const Tab = createMaterialTopTabNavigator();
  const hide = { display: "none", backgroundColor: "white" };
  const show = { backgroundColor: "white" };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          ...FONTS.body4,
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
