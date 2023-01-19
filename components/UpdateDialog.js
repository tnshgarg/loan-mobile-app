import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";

import { COLORS, SIZES, FONTS } from "../constants/Theme";

const UpdateDialog = ({ open, current, total }) => {
  return (
    <Modal isVisible={open} style={styles.modal}>
      <View style={styles.container}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.secondary,
          }}
        >
          Getting your updates
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.gray,
            textAlign: "center",
            alignSelf: "center",
            marginTop: "4%",
          }}
        >
          Please dont press the back button
        </Text>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    padding: "15rem",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: SIZES.height * 0.2,
  },
});

export default UpdateDialog;
