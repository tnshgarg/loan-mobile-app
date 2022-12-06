import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { TextInput } from "react-native";
import { useRef } from "react";
import { useEffect } from "react";

const OtpInput = ({ otp, setOtp, inputRef, accessibilityLabel }) => {
  const getNumberView = (val) => {
    return val != "" ? (
      <Text style={{ ...FONTS.h2, color: COLORS.secondary }}>{val}</Text>
    ) : (
      <View style={styles.empty} />
    );
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
        <View style={styles.container}>
          {getNumberView(otp?.charAt(0))}
          {getNumberView(otp?.charAt(1))}
          {getNumberView(otp?.charAt(2))}
          {getNumberView(otp?.charAt(3))}
          {getNumberView(otp?.charAt(4))}
          {getNumberView(otp?.charAt(5))}
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        accessibilityLabel={accessibilityLabel}
        ref={inputRef}
        onLayout={() => inputRef.current.focus()}
        keyboardType="number-pad"
        value={otp}
        onChange={(event) => {
          console.log(event.nativeEvent.text);
          setOtp(event.nativeEvent.text);
        }}
        maxLength={6}
        onKeyPress={(keyPress) => console.log(keyPress)}
        style={{
          color: COLORS.white,
          opacity: 0.001,
          position: "absolute",
        }}
        selectionColor={COLORS.white}
      />
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginVertical: 40,
    height: 50,
  },
  empty: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 50,
  },
});

export default OtpInput;
