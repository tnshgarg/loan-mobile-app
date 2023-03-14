import { View, Text, Pressable } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import { COLORS, SIZES } from "../../constants/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import WebView from "react-native-webview";
import Modal from "react-native-modal";

const TermsAndPrivacyModal = ({
  isVisible,
  setIsVisible,
  data,
  accessibilityLabel,
}) => {
  return (
    <Modal
      accessibilityLabel={accessibilityLabel}
      isVisible={isVisible}
      style={{
        flex: 1,
      }}
    >
      <Pressable
        onPress={() => setIsVisible(false)}
        style={styles.btnContainer}
        accessibilityLabel="CloseButton"
      >
        <AntDesign name="closesquareo" size={24} color="black" />
      </Pressable>
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          containerStyle={{ padding: 10 }}
          originWhitelist={["*"]}
          source={{ html: data }}
        />
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: SIZES.height - 100,
    width: SIZES.width - 40,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  btnContainer: {
    position: "absolute",
    top: "6%",
    right: "5%",
    zIndex: 999,
  },
});

export default TermsAndPrivacyModal;
