import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { Image, SafeAreaView } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";

import BottomTabNav from "../../components/BottomTabNav";
import Benefits from "./Benefits";
import HomeView from "./HomeView";
import Documents from "./Documents";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { buttons, nav } from "../../styles";

import Logout from "../../components/Logout";
export default Home = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Banking", component: HomeView },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider>
          <AppBar
            title={
              <Image
                style={nav.titleLogo}
                source={require("../../assets/unipe-Thumbnail.png")}
              />
            }
            centerTitle={true}
            contentContainerStyle={nav.navbar}
            color="#ffffff"
            leading={
              <Logout/>
            }
            trailing={<IconButton icon={<Icon name="more-vert" size={30} />} />}
          />
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
