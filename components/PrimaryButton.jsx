import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@react-native-material/core";
import { COLORS, FONTS } from "../constants/Theme";

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
}) => {
  return !loading ? (
    <Button
      uppercase={false}
      title={title}
      titleStyle={[styles.btnText, { ...titleStyle }]}
      type="solid"
      style={[styles.button, { ...containerStyle }]}
      disabled={disabled}
      onPress={onPress}
      color={disabled ? COLORS.gray : COLORS.primary}
      pressableContainerStyle={{ width: "100%" }}
      contentContainerStyle={{ width: "100%", height: "100%" }}
    />
  ) : (
    <TouchableOpacity style={[styles.button, styles.loadingButton]} disabled>
      <ActivityIndicator size="large" color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    height: 50,
  },
  loadingButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default PrimaryButton;
