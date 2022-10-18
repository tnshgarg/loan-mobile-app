import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { checkBox } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";

const Checkbox = ({ value, setValue, text }) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={value}
        onValueChange={setValue}
        tintColors={{ true: COLORS.primary }}
      />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  title: {
    marginLeft: 5,
    ...FONTS.h4,
    color: COLORS.gray,
    flex: 1,
  },
});

export default Checkbox;
