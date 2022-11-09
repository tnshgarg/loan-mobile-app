import NetInfo, {
  NetInfoCellularGeneration,
} from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { AddListener } from "../../helpers/InternetCheck";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { showToast } from "./atoms/Toast";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../constants/Theme";
import PrimaryButton from "./atoms/PrimaryButton";
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
            <View style={styles.modalContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name="web-refresh"
                  size={SIZES.width * 0.2}
                  color={COLORS.warning}
                  onPress={() => {
                    NetInfo.refresh();
                    showToast("Trying to Connect to the internet");
                  }}
                />
              </View>
              <Text style={styles.title}>
                You are offline. Please check your internet connection and try
                again.
              </Text>

              <Text style={styles.subtitle}>
                Do not worry , everything you did till you lost your connection
                to the internet has been saved!{"\n"}
              </Text>
              <Text style={styles.subtitle}>
                On recconecting you can continue from right where you left off.
              </Text>
              <View style={{ justifyContent: "flex-end", marginTop: "5%" }}>
                <Text style={styles.subtitle}>
                  Go to Settings-&gt; Wifi-&gt; Switch wifi on and connect to a
                  known network
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: "5%",
                    ...styles.subtitle,
                  }}
                >
                  -OR-{"\n"}
                </Text>
                <Text style={styles.subtitle}>
                  Go to Settings-&gt; Data Usage-&gt; Switch on Mobile
                  Data/Cellular Data -&gt; Switch mobile data on
                </Text>
              </View>
              <PrimaryButton
                title={"Refresh"}
                onPress={() => {
                  NetInfo.refresh();
                  showToast("Trying to Connect to the internet");
                }}
                containerStyle={{ height: 40 }}
                titleStyle={{ ...FONTS.h4 }}
              />
            </View>
          </Modal>

          {children}
        </>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: "$white",
    flex: 1,
    padding: "15rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: "40rem",
  },
  iconContainer: {
    padding: "15rem",
    borderRadius: SIZES.width * 0.2,
    backgroundColor: COLORS.warningBackground,
    //alignSelf: "center",
  },
  title: {
    ...FONTS.h4,
    color: COLORS.warning,
    textAlign: "center",
    //width: "70%",
    marginVertical: "20rem",
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    //textAlign: "center",
    //width: "70%",
  },
});

export default OfflineAlert;
