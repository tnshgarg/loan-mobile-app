import NetInfo from "@react-native-community/netinfo";
import React, { useState, useRef, useEffect } from "react";
import { Text, View } from "react-native";

const OfflineAlert = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const unsub = NetInfo.addEventListener((networkState) => {
        if (networkState.isConnected && networkState.isInternetReachable) {
          setIsConnected(true);
          console.log("isConnected: ", networkState);
        } else {
          setIsConnected(false);
        }
        setUnsubscribe(unsub);
      });
    } else {
      unsubscribe();
    }
  }, [isMounted]);

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
