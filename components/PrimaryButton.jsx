import { View } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import { styles } from "../styles";

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
  title,
  color,
  disabled,
  type,
  uppercase,
  titleStyle,
  style,
  wrapperStyle,
  onPress,
  otherProps,
}) => {
  return (
    <View style={wrapperStyle}>
      <Button
        uppercase={uppercase}
        title={title}
        color={color}
        type={type}
        style={style}
        contentContainerStyle={styles.ContinueButton}
        disabled={disabled}
        onPress={onPress}
        titleStyle={[styles.continueButtonText, titleStyle]}
        {...otherProps}
      />
    </View>
  );
};

export default PrimaryButton;
