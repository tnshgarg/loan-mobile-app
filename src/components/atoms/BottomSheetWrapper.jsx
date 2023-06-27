import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";

import { COLORS, SIZES } from "../../constants/Theme";

const BottomSheetWrapper = ({ open, setOpen, children, containerStyle }) => {
  return (
    <Modal
      isVisible={open}
      style={styles.modal}
      onBackdropPress={() => setOpen(false)}
    >
      <View style={[styles.container, { ...containerStyle }]}>{children}</View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    //flex: 0.35,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    padding: "25rem",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: SIZES.height * 0.75,
  },
});

export default BottomSheetWrapper;
