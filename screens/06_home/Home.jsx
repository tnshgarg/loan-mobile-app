import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import BottomTabNav from "../../components/BottomTabNav";
import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import HomeMain from "./HomeMain";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import EWA from "./Money/EWA/EWA";

const Home = () => {
  const dispatch = useDispatch();
  const tabs = [
    { name: "Home", component: HomeMain },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: EWA },
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
