import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "@react-native-material/core";
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

const PrimaryButton = ({
  containerStyle,
  disabled,
  loading,
  title,
  titleStyle,
  onPress,
  accessibilityLabel,
}) => {
  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      uppercase={false}
      title={title}
      titleStyle={[styles.btnText, { ...titleStyle }]}
      type="solid"
      style={[styles.button, { ...containerStyle }]}
      disabled={disabled || loading}
      onPress={onPress}
      color={disabled || loading ? COLORS.gray : COLORS.primary}
      pressableContainerStyle={{ width: "100%" }}
      contentContainerStyle={{ height: "100%" }}
    />
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
    borderRadius: 20,
  },
  loadingButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default PrimaryButton;
