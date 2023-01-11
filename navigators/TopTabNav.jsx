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
          ...FONTS.body5,
          textTransform: "capitalize",
        },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: props.hide ? hide : show,
        tabBarPressColor: COLORS.primary,
        animationEnabled: true,
        tabBarScrollEnabled: false,
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
            options={{
              tabBarAccessibilityLabel: tab.name,
              unmountOnBlur: true,
            }}
            listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TopTabNav;
