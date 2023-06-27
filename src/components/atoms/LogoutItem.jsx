import { Image, Text, TouchableNativeFeedback, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import SvgContainer from "./SvgContainer";

const LogoutItem = ({
  item,
  disabled,
  showIcon,
  selected,
  titleStyle,
  subtitleStyle,
  iconSize,
  containerStyle,
}) => {
  const { title, subtitle, iconName, onPress } = item;

  return (
    <TouchableNativeFeedback
      accessibilityLabel="InfoCard"
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: item.imageUri }}
          style={{ height: 40, width: 40 }}
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
        <View style={{ width: "10%" }}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={COLORS.gray}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray_01,
    padding: "10rem",
  },
  textContainer: {
    paddingLeft: "15rem",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    width: "10%",
  },
  title: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  subtitle: { ...FONTS.body4, color: COLORS.black },
});

export default LogoutItem;
