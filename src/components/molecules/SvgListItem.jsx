import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const SvgListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.imageUri}
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: "15rem",
  },
  text: {
    ...FONTS.body4,
    color: COLORS.secondary,
    marginLeft: "20rem",
    flex: 1,
  },
});

export default SvgListItem;
