import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { COLORS } from "../../constants/Theme";

const BottomSheetWrapper = ({ open, setOpen, children }) => {
  return (
    <Modal
      isVisible={open}
      style={styles.modal}
      onBackdropPress={() => setOpen(false)}
    >
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    //flex: 0.35,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomSheetWrapper;
