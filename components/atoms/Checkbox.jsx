import { View, Text } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { checkBox } from "../../styles";
import { COLORS } from "../../constants/Theme";

const Checkbox = ({ value, setValue, text }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        value={value}
        onValueChange={setValue}
        style={checkBox.checkBox}
        tintColors={{ true: COLORS.primary }}
      />
      <Text style={checkBox.checkBoxText}>{text}</Text>
    </View>
  );
};

export default Checkbox;
