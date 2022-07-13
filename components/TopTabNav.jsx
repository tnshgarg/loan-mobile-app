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
        sceneContainerStyle: {
          flex: 1,
          backgroundColor: "powderblue",
          marginTop: 100,
          zIndex: 0,
        },
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
      }}
    >
      {props.tabs.map((tab, index) => {
        return <Tab.Screen name={tab.name} component={tab.component} />;
      })}
    </Tab.Navigator>
  );
};
