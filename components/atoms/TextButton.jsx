import { Button } from "@react-native-material/core";
import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

const TextButton = ({
  containerStyle,
  disabled,
  loading,
  label,
  labelStyle,
  onPress,
}) => {
  return !loading ? (
    <Button
      uppercase={false}
      title={label}
      titleStyle={[styles.btnText, { ...labelStyle }]}
      type="solid"
      style={[styles.button, { ...containerStyle }]}
      disabled={disabled}
      onPress={onPress}
      color={disabled ? COLORS.lightGray : COLORS.primary}
      pressableContainerStyle={{ width: "100%" }}
      contentContainerStyle={{ width: "100%", height: "100%" }}
    />
  ) : (
    <TouchableOpacity style={[styles.button, styles.loadingButton]} disabled>
      <ActivityIndicator size="large" color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    height: 50,
  },
  loadingButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default TextButton;
