import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Image, Modal, SafeAreaView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Offline from "../../assets/Offline.svg";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { AddListener } from "../../helpers/InternetCheck";
import { strings } from "../../helpers/Localization";
import PrimaryButton from "../atoms/PrimaryButton";
import SvgContainer from "../atoms/SvgContainer";
import { showToast } from "../atoms/Toast";

const OfflineAlert = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isReachable, setIsReachable] = useState(false);

  const handleConnectivityChange = (connection) => {
    setIsConnected(connection?.isConnected && connection?.isInternetReachable);
    console.log("isConnected", connection?.isConnected);
    console.log("isInternetReachable", connection?.isInternetReachable);
    console.log("isConnected", connection);
    setIsReachable(connection?.isInternetReachable);
  };

  useEffect(() => {
    const unsub = AddListener(handleConnectivityChange);
    return () => {
      unsub();
    };
  }, []);

  if (!isReachable)
    return (
      <Image
        source={require("../../assets/splash_screen.png")}
        style={{
          flex: 1,
          width: "100%",
        }}
      />
    );

  return isConnected ? (
    <>{children}</>
  ) : (
    <Modal animationType="fade" visible={true}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.modalContainer}>
          <SvgContainer width={SIZES.width * 0.8} height={SIZES.width * 0.8}>
            <Offline />
          </SvgContainer>

          <Text style={styles.title}>{strings.noInternet}</Text>

          <Text style={styles.subtitle}>{strings.checkInternetConnection}</Text>

          <PrimaryButton
            title={strings.refresh}
            onPress={() => {
              NetInfo.refresh();
              showToast("Trying to Connect to the internet", "pending");
            }}
            containerStyle={{ width: "50%" }}
          />
        </View>
      </SafeAreaView>
    </Modal>
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
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: "center",
    //width: "70%",
    marginTop: "20rem",
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: "20rem",
    //textAlign: "center",
    //width: "70%",
  },
});

export default OfflineAlert;
