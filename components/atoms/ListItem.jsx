import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";

const ListItem = ({ item, disabled }) => {
  const { title, iconName, onPress } = item;
  if (item.title == "NotFound") {
    return (
      <Text style={styles.notFoundContainer}>
        There are no options found for your bank
      </Text>
    );
  }
  return (
    <TouchableOpacity
      accessibilityLabel="InfoCard"
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialCommunityIcons name={iconName} size={24} color={COLORS.gray} />
      <Text style={styles.text}>{title}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={COLORS.gray}
      />
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGray,
  },
  text: { paddingLeft: "10rem", ...FONTS.body4, color: COLORS.black, flex: 1 },
  notFoundContainer: {
    padding: "10rem",
  },
});

export default ListItem;
