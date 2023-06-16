import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CmsComponent from "./CmsComponent";

const CmsTabs = ({ children }) => {
  const safeChildren = children || [];
  const navigation = useNavigation();
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
        tabBarStyle: false ? hide : show,
        tabBarPressColor: COLORS.primary,
        animationEnabled: true,
        tabBarScrollEnabled: false,
        //   swipeEnabled: !props.hide,
        lazy: true,
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}
    >
      {safeChildren?.map((tab, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tab.name}
            // initialParams={tab.initialParams}
            options={{
              tabBarAccessibilityLabel: tab.name,
            }}
            children={() => <CmsComponent cmsData={tab?.data} />}
          />
        );
      })}
    </Tab.Navigator>
    // {/* {safeChildren?.map((child, index) => (
    //   <View key={index}>{child.element(child)}</View>
    // ))} */}
  );
};

const styles = EStyleSheet.create({
  container: {
    // paddingVertical: "15rem",
    // marginTop: "10rem",
    flex: 1,
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: "24rem",
    width: "24rem",
    borderRadius: "5rem",
    marginRight: "10rem",
  },
  title: {
    ...FONTS.body3,
    color: COLORS.black,
    flex: 1,
  },
  ctaText: { ...FONTS.body4, color: COLORS.primary, marginRight: "3rem" },
});

export default CmsTabs;
