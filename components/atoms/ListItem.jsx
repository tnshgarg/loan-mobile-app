import { Text, TouchableNativeFeedback, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";

const ListItem = ({ item, disabled, showIcon, selected, titleStyle }) => {
  const { title, subtitle, iconName, onPress } = item;

  return (
    <TouchableNativeFeedback
      accessibilityLabel="InfoCard"
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: selected
              ? COLORS.primary
              : disabled
              ? COLORS.lightgray_01
              : COLORS.white,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={
            selected ? COLORS.white : disabled ? COLORS.gray : COLORS.black
          }
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { ...titleStyle },
              {
                color: selected
                  ? COLORS.white
                  : disabled
                  ? COLORS.gray
                  : COLORS.black,
              },
            ]}
          >
            {title}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {showIcon && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={
              selected ? COLORS.white : disabled ? COLORS.gray : COLORS.black
            }
          />
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray_01,
  },
  textContainer: {
    paddingLeft: "10rem",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  title: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  subtitle: { ...FONTS.body5, color: COLORS.gray },
});

export default ListItem;