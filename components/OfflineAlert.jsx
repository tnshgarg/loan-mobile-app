import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { AddListener } from "../helpers/InternetCheck";

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
          <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            style={{ height: "3%"}}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Your Device seems to have lost internet connectivity",
                  "Please note that you cannot proceed without an internet connection",
                  [
                    { text: "Ok", onPress: () => null, style: "cancel" },
                    {
                      text: "refresh",
                      onPress: () => NetInfo.refresh(),
                    },
                  ]
                );
              }}
              style={{
                height: "3%",
                backgroundColor: "#f56a6a",
              }}
            >
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ alignSelf: "center" }}>
                  No Internet Connection
                </Text>
              </View>
            </TouchableOpacity>
          </Modal>

          {children}
        </>
      )}
    </>
  );
};

export default OfflineAlert;
