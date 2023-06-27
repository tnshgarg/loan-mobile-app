import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";

const Rating = ({ value, setValue }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setValue(index + 1)}
        >
          <MaterialCommunityIcons
            name={value >= index + 1 ? "star" : "star-outline"}
            color={value >= index + 1 ? COLORS.yellow : COLORS.lightGray}
            size={56}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "15rem",
    justifyContent: "center",
  },
  title: {
    marginLeft: "5rem",
    ...FONTS.body4,
    color: COLORS.gray,
    flex: 1,
  },
  additionalTitle: { color: COLORS.primary },
});

export default Rating;
