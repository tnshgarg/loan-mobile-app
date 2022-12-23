import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import FormInput from "../atoms/FormInput";
import { Icon } from "@react-native-material/core";
import { FONTS } from "../../constants/Theme";
import { Popable } from "react-native-popable";

const PopableInput = ({
  containerStyle,
  value,
  onChange,
  placeholder,
  autoCapitalize,
  content,
  accessibilityLabel,
}) => {
  return (
    <FormInput
      accessibilityLabel={accessibilityLabel}
      containerStyle={{ ...styles.container, ...containerStyle }}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      onChange={onChange}
      appendComponent={
        <Popable content={content} position="left">
          <Icon name="info-outline" size={20} color="grey" />
        </Popable>
      }
    />
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: "15rem",
  },
  header: {
    ...FONTS.h3,
    marginBottom: "10rem",
    alignSelf: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "15rem",
  },
  listText: {
    ...FONTS.h3,
    flex: 1,
    marginLeft: "10rem",
  },
});

export default PopableInput;
