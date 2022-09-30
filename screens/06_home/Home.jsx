import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import { useDispatch } from "react-redux";

import BottomTabNav from "../../components/BottomTabNav";
import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { buttons } from "../../styles";
import EWA from "./Money/EWA/EWA";

const Home = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const tabs = [
    { name: "Home", component: HomeView },
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

export default Home;
