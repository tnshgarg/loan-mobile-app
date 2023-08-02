import { Image, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";

const ListItem = ({
  item,
  disabled,
  showIcon,
  selected,
  titleStyle,
  subtitleStyle,
  iconSize,
  containerStyle,
}) => {
  const { title, subtitle, iconName, onPress, subItems } = item;

  return (
    <>
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
            {subtitle && (
              <Text style={[styles.subtitle, { ...subtitleStyle }]}>
                {subtitle}
              </Text>
            )}
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

      {!disabled && subItems ? (
        <View style={styles.extension}>
          {subItems.map((item, index) => {
            return (
              <TouchableOpacity key={item?.title} style={styles.image} activeOpacity={0.5} onPress={item.onPress} disabled={disabled}>
                <Image
                  source={item.image}
                  style={{
                    flex: 1,
                    aspectRatio: 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      ): null}
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    padding: "20rem",
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
  extension: {
    width: "100%",
    padding: "5rem",
    flexDirection: "row",
    height: "60rem",
    borderBottomWidth: 1,
    alignItems: "space-between",
    borderColor: COLORS.lightgray_01,
  },
  subtitle: { ...FONTS.body5, color: COLORS.gray },
  image: {
    flex: 1,
    alignItems: "center",
    width: "40rem",
  },
});

export default ListItem;
