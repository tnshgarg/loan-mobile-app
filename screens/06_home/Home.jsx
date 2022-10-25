import { useEffect } from "react";
import { SafeAreaView, BackHandler, Alert } from "react-native";
import { useDispatch } from "react-redux";
import BottomTabNav from "../../navigators/BottomTabNav";
import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import EWA from "./Money/EWA/EWA";

const Home = () => {
  const dispatch = useDispatch();
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: EWA },
  ];

  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomTabNav tabs={tabs} />
    </SafeAreaView>
  );
};

export default Home;
