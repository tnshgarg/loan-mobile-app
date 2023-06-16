import { Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

/**
 *
 * @param title -> title of the button
 * @param color -> color of the button
 * @param disabled -> sets if the button is disabled or not
 * @param type -> defines the type of the button according to react-native-material module
 * @param uppercase -> defines if the letters are uppercase or smallercase
 * @param titleStyle -> defines the style of text of the button
 * @param onPress -> defines the onPress attr for the button
 * @param wrapperStyle -> used to provide container styling to the Button Container
 * @param style -> used to provide styling to the Button
 * @param otherProps -> used for defining other props to the Button
 */

const CmsButton = ({
  containerStyle,
  disabled,
  loading,
  title,
  titleStyle,
  onPress,
  accessibilityLabel,
  iconName,
}) => {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor:
            disabled || loading ? COLORS.lightGray : COLORS.primary,
          ...containerStyle,
        },
      ]}
      disabled={disabled || loading}
      loading={loading}
      loadingIndicatorPosition="trailing"
      onPress={onPress}
    >
      <Text style={[styles.btnText, { ...titleStyle }]}>{title}</Text>
      {iconName ? (
        <MaterialCommunityIcons
          name={iconName}
          color={COLORS.white}
          size={20}
          style={{ marginLeft: 5 }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10rem",
    width: "100%",
    height: SIZES.btnHeight,
    borderRadius: "50rem",
    flexDirection: "row",
  },
  loadingButton: {
    backgroundColor: COLORS.primary,
    padding: "10rem",
    borderRadius: "5rem",
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default CmsButton;
