import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import TopAppBar from "../../components/molecules/TopAppBar";
import BottomTabNav from "../../navigators/BottomTabNav";
import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import EWANavigator from "../../navigators/EWANavigator";

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
    <SafeAreaView style={{ flex: 1 }}>
      <TopAppBar />
      <BottomTabNav tabs={tabs} />
    </SafeAreaView>
  );
};

export default Home;
