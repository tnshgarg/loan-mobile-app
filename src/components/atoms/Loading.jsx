import React from "react";
import { ActivityIndicator, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/Theme";

function LoadingComponent({ loaderColor }) {
  return (
    <View style={styles.cont}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <ActivityIndicator size="large" color={loaderColor ?? COLORS.primary} />
      </View>
    </View>
  );
}

function Loading({ isLoading = false, withModal = true, loaderColor }) {
  if (withModal) {
    return (
      <Modal style={styles.cont} transparent visible={isLoading}>
        <LoadingComponent loaderColor={loaderColor} />
      </Modal>
    );
  }
  if (isLoading) {
    return <LoadingComponent loaderColor={loaderColor} />;
  }
  return null;
}

export default Loading;

const styles = EStyleSheet.create(() => ({
  cont: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
