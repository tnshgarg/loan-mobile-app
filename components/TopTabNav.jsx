import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default TopTabNav = (props) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "white" },
        tabBarPressColor: "purple",
        animationEnabled: true,
        swipeEnabled: props.swipe,
        tabBarScrollEnabled: true,
        lazy: true,
        tabBarIndicatorStyle: { backgroundColor: "#4E46F1" },
      }}
    >
      {props.tabs.map((tab, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            initialParams={tab.initialParams}
            listeners={{
              tabPress: (e) => {
                tab.disable ? e.preventDefault() : null;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
