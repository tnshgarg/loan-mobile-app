import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FormInput from "../atoms/FormInput";
import { Icon, IconButton } from "@react-native-material/core";
import { COLORS, FONTS } from "../../constants/Theme";
import { useState } from "react";
import { Popable } from "react-native-popable";

const PopableInput = ({
  containerStyle,
  value,
  onChange,
  placeholder,
  autoCapitalize,
  content,
}) => {
  return (
    <FormInput
      containerStyle={{ ...styles.container, ...containerStyle }}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      onChange={onChange}
      appendComponent={
        <Popable content={content} position="left" caret={false}>
          <Icon name="info-outline" size={20} color="grey" />
        </Popable>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  header: {
    ...FONTS.h3,
    marginBottom: 10,
    alignSelf: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  listText: {
    ...FONTS.h3,
    flex: 1,
    marginLeft: 10,
  },
});

export default PopableInput;
