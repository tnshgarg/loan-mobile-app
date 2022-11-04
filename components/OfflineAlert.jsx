import NetInfo, {
  NetInfoCellularGeneration,
} from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { AddListener } from "../helpers/InternetCheck";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { showToast } from "./atoms/Toast";
const OfflineAlert = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectivityChange = (connection) => {
    setIsConnected(connection?.isConnected && connection?.isInternetReachable);
    console.log("isConnected", connection?.isConnected);
    console.log("isInternetReachable", connection?.isInternetReachable);
    console.log("isConnected", connection);
  };

  useEffect(() => {
    const unsub = AddListener(handleConnectivityChange);
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {isConnected ? (
        <>{children}</>
      ) : (
        <>
          <Modal animationType="fade" visible={true}>
            <View
              style={{
                backgroundColor: "#f56a6a",
                padding: 15,
                borderRadius: 20,
                margin: "10%",
                width: "80%",
                height: "auto",
              }}
            >
              <Text>
                You are offline. Please check your internet connection and try
                again.
              </Text>

              <View style={{ justifyContent: "flex-end", marginTop: "10%" }}>
                <Icon
                  name="web-refresh"
                  size={50}
                  color="#fff"
                  onPress={() => {
                    NetInfo.refresh();
                    showToast("Trying to Connect to the internet");
                  }}
                />
                <Text>Refresh network connectivity</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#2CB77C",
                padding: 15,
                borderRadius: 20,
                margin: "10%",
                width: "80%",
                height: "auto",
              }}
            >
              <Text>
                Do not worry , everything you did till you lost your connection
                to the internet has been saved!{"\n"}
              </Text>
              <Text>
                On recconecting you can continue from right where you left off.
              </Text>
              <View style={{ justifyContent: "flex-end", marginTop: "5%" }}>
                <Text>
                  Go to Settings-&gt; Wifi-&gt; Switch wifi on and connect to a
                  known network
                </Text>
                <Text style={{ alignSelf: "center", marginTop: "5%" }}>
                  -OR-{"\n"}
                </Text>
                <Text>
                  Go to Settings-&gt; Data Usage-&gt; Switch on Mobile
                  Data/Cellular Data -&gt; Switch mobile data on
                </Text>
              </View>
            </View>
          </Modal>

          {children}
        </>
      )}
    </>
  );
};

export default OfflineAlert;
