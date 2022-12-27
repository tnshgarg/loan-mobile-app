import NetInfo, {
  NetInfoCellularGeneration,
} from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { AddListener } from "../../helpers/InternetCheck";
import { showToast } from "../atoms/Toast";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import Offline from "../../assets/offline.svg";
import LogoHeader from "../atoms/LogoHeader";
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
            <LogoHeader />
            <View style={styles.modalContainer}>
              <Offline />

              <Text style={styles.title}>No Internet</Text>

              <Text style={styles.subtitle}>
                Please check your internet connection
              </Text>

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
    ...FONTS.h3,
    color: COLORS.secondary,
    textAlign: "center",
    //width: "70%",
    marginTop: "20rem",
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: "20rem",
    //textAlign: "center",
    //width: "70%",
  },
});

export default OfflineAlert;
