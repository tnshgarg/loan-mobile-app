import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Modal, SafeAreaView, Text, View } from "react-native";
import { AddListener } from "../../helpers/InternetCheck";
import { showToast } from "../atoms/Toast";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import Offline from "../../assets/Offline.svg";
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
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {isConnected ? (
        <>{children}</>
      ) : (
        <>
          <Modal animationType="fade" visible={true}>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                    showToast("Trying to Connect to the internet", "pending");
                  }}
                  containerStyle={{ height: 40 }}
                  titleStyle={{ ...FONTS.h4 }}
                />
              </View>
            </SafeAreaView>
          </Modal>

          {children}
        </>
      )}
    </View>
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
