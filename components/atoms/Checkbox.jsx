import { View, Text } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const Checkbox = ({ value, setValue, text }) => {
  return (
    <View style={styles.container}>
      <CheckBox
        accessibilityLabel="CheckBox"
        value={value}
        onValueChange={setValue}
        tintColors={{ true: COLORS.primary }}
      />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "5rem",
  },
  title: {
    marginLeft: "5rem",
    ...FONTS.body5,
    color: COLORS.gray,
    flex: 1,
  },
});

export default Checkbox;
