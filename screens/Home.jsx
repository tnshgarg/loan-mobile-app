import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, SafeAreaView } from "react-native";
import BottomTabNav from "../components/BottomTabNav";
import HomeView from "./HomeView";
import { buttons, nav } from "./styles";

// import Amplify from "@aws-amplify/core";
// import Auth from "@aws-amplify/auth";
// import awsconfig from "../src/aws-exports";
// Amplify.configure(awsconfig);

import { FAB, Portal, Provider } from "react-native-paper";
import Document from "./Document";
import Benefits from "./Benefits";

export default Home = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Document },
    { name: "Benefits", component: Benefits },
    { name: "Banking", component: HomeView },
  ];
  // const signOut = () => {
  //   if (user) {
  //     Auth.signOut();
  //     dispatch({
  //       type: "SET_USER",
  //       payload: null,
  //     });
  //     navigation.navigate("Login");
  //     console.log("signed out");
  //   } else {
  //     console.log("No user to sign out");
  //   }
  // };
  const navigation = useNavigation();
  console.log("USER REGED");
  console.log(user);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider>
          <AppBar
            title={
              <Image
                style={nav.titleLogo}
                source={require("../assets/unipe-Thumbnail.png")}
              />
            }
            centerTitle={true}
            contentContainerStyle={nav.navbar}
            color="#ffffff"
            leading={
              <IconButton
                icon={<Icon name="menu" size={30} />}
                onPress={() => signOut()}
              />
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
