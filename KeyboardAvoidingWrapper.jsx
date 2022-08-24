import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { styles } from "./styles";

export const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1}}>
      <KeyboardAvoidingView
        enabled
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
