import { View, Text, Modal, Alert } from "react-native";
import React from "react";
import { FONTS } from "../../constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";
import SVGImg from "../../assets/UnipeLogo.svg";

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
            Logging you out...
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
    backgroundColor: "$white",
    flex: 1,
    padding: "15rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
});

export default LogoutModal;
