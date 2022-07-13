import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeView from "../screens/HomeView";
import ESICForm from "../screens/ESIC/ESICForm";

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
      <Tab.Screen name="EPFO" component={HomeView} />
      <Tab.Screen name="ESIC" component={ESICForm} />
      <Tab.Screen name="Offer Letter" component={HomeView} />
      <Tab.Screen name="Pay Slips" component={HomeView} />
      <Tab.Screen name="ID Card" component={HomeView} />
    </Tab.Navigator>
  );
};
