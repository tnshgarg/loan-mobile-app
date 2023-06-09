import { Text, TouchableNativeFeedback, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import SvgContainer from "./SvgContainer";

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
            ...containerStyle,
          },
        ]}
      >
        <SvgContainer height={24} width={24}>
          {item.imageUri}
        </SvgContainer>
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
  subtitle: { ...FONTS.body5, color: COLORS.gray },
});

export default ListItem;
