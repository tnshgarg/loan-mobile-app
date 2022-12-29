import { Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";

const ListItem = ({ item, disabled }) => {
  const { title, iconName, onPress } = item;
  
  return (
    <TouchableOpacity
      accessibilityLabel="InfoCard"
      style={styles.container}
      activeOpacity={0.8}
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
    padding: "18rem",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGray,
  },
  text: { paddingLeft: "20rem", ...FONTS.body4, color: COLORS.gray, flex: 1 },
});

export default ListItem;
