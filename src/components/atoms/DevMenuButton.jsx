import React from "react";
import { dev } from "../../styles";
import PrimaryButton from "./PrimaryButton";

export default DevMenuButton = ({ onPress, title, accessibilityLabel }) => {
  return (
    <PrimaryButton
      accessibilityLabel={accessibilityLabel}
      title={title}
      containerStyle={dev.btn}
      onPress={onPress}
    />
  );
};
