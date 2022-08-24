import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import { useDispatch } from "react-redux";

import BottomTabNav from "../../components/BottomTabNav";
import Benefits from "./Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";
import HomeMain from "./HomeMain";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { buttons } from "../../styles";

export default Home = () => {
  const navigation = useNavigation();

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const tabs = [
    { name: "Home", component: HomeMain },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: HomeView },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? "tennis-ball" : "plus"}
              style={{ marginBottom: 50 }}
              fabStyle={buttons.FAB}
              actions={[
                {
                  icon: "stethoscope",
                  label: "Insurance",
                  style: buttons.FAB,
                  labelTextColor: "black",
                  onPress: () => console.log("Pressed stethoscope"),
                },
                {
                  icon: "toolbox",
                  label: "Settings",
                  style: buttons.FAB,
                  labelTextColor: "black",
                  onPress: () => console.log("Pressed Settings"),
                },
                {
                  icon: "typewriter",
                  label: "Invoice",
                  style: buttons.FAB,
                  labelTextColor: "black",
                  onPress: () => console.log("Pressed Invoice"),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
          <BottomTabNav tabs={tabs} />
        </Provider>
      </SafeAreaView>
    </>
  );
};
