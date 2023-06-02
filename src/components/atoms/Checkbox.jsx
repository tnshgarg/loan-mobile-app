import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";

const Checkbox = ({ value, setValue, text, additionalText, onPress }) => {
  console.log(value);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setValue(!value)} activeOpacity={0.7}>
        <MaterialCommunityIcons
          name={value ? "checkbox-marked" : "checkbox-blank-outline"}
          color={value ? COLORS.primary : COLORS.gray}
          size={24}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {text}
        {additionalText && (
          <Text style={styles.additionalTitle} onPress={onPress}>
            {" " + additionalText}
          </Text>
        )}
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "10rem",
  },
  title: {
    marginLeft: "5rem",
    ...FONTS.body4,
    color: COLORS.gray,
    flex: 1,
  },
  additionalTitle: { color: COLORS.primary },
});

export default Checkbox;
