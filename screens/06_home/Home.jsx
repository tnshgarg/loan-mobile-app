import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import { useDispatch } from "react-redux";

import BottomTabNav from "../../components/BottomTabNav";
import Benefits from "./Benefits";
import Documents from "./Documents/Documents";
import HomeView from "./HomeView";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { buttons } from "../../styles";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";

export default Home = () => {
  const navigation = useNavigation();

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Banking", component: HomeView },
  ];

  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const message =
    (bankStatus != "SUCCESS" ? "Bank Account Details\n" : "") +
    (panStatus != "SUCCESS" ? "PAN Details\n" : "") +
    (aadhaarStatus != "SUCCESS" ? "Aadhaar Details" : "");

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
          {message != ""
            ? showMessage({
                message:
                  "Following pending steps need to be completed in order to receive advance salary.",
                description: message,
                type: "warning",
                backgroundColor: "#4E46F1",
                color: "white",
                onPress: () => {
                  navigation.navigate("KYC");
                },
              })
            : null}

          <BottomTabNav tabs={tabs} />
        </Provider>
      </SafeAreaView>
    </>
  );
};
