import { useEffect, useState } from "react";
import { Image, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import BottomTabNav from "../../components/BottomTabNav";
import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import EWA from "./Money/EWA/EWA";
import EWANavigator from "../../navigators/EWANavigator";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { nav } from "../../styles";

const Home = () => {
  const dispatch = useDispatch();
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: EWANavigator },
  ];

  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomTabNav tabs={tabs} />
      </SafeAreaView>
    </>
  );
};

export default Home;
