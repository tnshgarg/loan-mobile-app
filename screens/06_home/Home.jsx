import { useEffect } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import TopAppBar from "../../components/molecules/TopAppBar";
import BottomTabNav from "../../navigators/BottomTabNav";
import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";
import { addCurrentScreen,addCurrentStack } from "../../store/slices/navigationSlice";
import EWANavigator from "../../navigators/EWANavigator";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: EWANavigator },
  ];

  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
    dispatch(addCurrentStack("HomeStack"));
  }, []);

  const backAction = () => {
    navigation.navigate("Home", { replace: true });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopAppBar />
      <BottomTabNav tabs={tabs} />
    </SafeAreaView>
  );
};

export default Home;
