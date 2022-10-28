import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const OfflineAlert = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const handleConnectivityChange = (connection) => {
    setIsConnected(connection?.isConnected && connection?.isInternetReachable);
    console.log("isConnected", connection?.isConnected);
    console.log("isInternetReachable", connection?.isInternetReachable);
    console.log("isConnected", connection);
  };

  useEffect(() => {
    const unsub = NetInfo.addEventListener(handleConnectivityChange);
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
          <View
            style={{
              height: "3%",
              zindex: 10,
              backgroundColor: "#f56a6a",
            }}
          >
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ alignSelf: "center" }}>
                No Internet Connection
              </Text>
            </View>
          </View>
          {children}
        </>
      )}
    </>
  );
};

export default OfflineAlert;
