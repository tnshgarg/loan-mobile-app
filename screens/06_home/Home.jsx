import { useEffect } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import TopAppBar from "../../components/molecules/TopAppBar";
import BottomTabNav from "../../navigators/BottomTabNav";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopAppBar />
      <BottomTabNav />
    </SafeAreaView>
  );
};

export default Home;
