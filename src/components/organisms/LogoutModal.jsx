import React from "react";
import { Alert, Modal, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import SVGImg from "../../assets/UnipeLogo.svg";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";

const LogoutModal = ({ modalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Please wait while we log you out");
      }}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <SVGImg />
          </View>
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            {strings.loggingOut}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: "15rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
});

export default LogoutModal;
