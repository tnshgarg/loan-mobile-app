import React from "react";
import { View, Text, TextInput } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

const FormInput = ({
  containerStyle,
  value,
  label,
  labelStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize,
  errorMsg = "",
  disabled,
  maxLength,
  numeric,
  autoFocus,
  required,
  letterSpacing,
  textAlign,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      {label && (
        <View style={styles.inputHeader}>
          <Text style={{ color: COLORS.gray, ...FONTS.h4, ...labelStyle }}>
            {label}
          </Text>

          <Text style={{ color: COLORS.warning, ...FONTS.body3 }}>
            {errorMsg}
          </Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        {prependComponent}
        <TextInput
          style={{
            flex: 1,
            ...FONTS.body4,
            color: COLORS.black,

            ...inputStyle,
            //backgroundColor: COLORS.secondary,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={(value) => onChange(value)}
          editable={!disabled}
          maxLength={maxLength}
          numeric={numeric}
          autoFocus={autoFocus}
          required={required}
          letterSpacing={letterSpacing}
          textAlign={textAlign}
        />
        {appendComponent}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5rem",
  },
  inputContainer: {
    flexDirection: "row",
    height: SIZES.btnHeight,
    //paddingHorizontal: SIZES.padding,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: "10rem",
  },
});

export default FormInput;
