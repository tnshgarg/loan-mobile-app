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
  errorMsg,
  disabled,
  maxLength,
  numeric,
  autoFocus,
  required,
  letterSpacing,
  textAlign,
  selection,
  testID,
  accessibilityLabel,
}) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      {label && (
        <View style={styles.inputHeader}>
          <Text style={{ color: COLORS.gray, ...FONTS.h4, ...labelStyle }}>
            {label}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          { borderColor: errorMsg ? COLORS.warning : COLORS.lightGray },
        ]}
      >
        {prependComponent}
        <TextInput
          testID={testID}
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
          selection={selection}
          accessibilityLabel={accessibilityLabel}
        />
        {appendComponent}
      </View>
      {errorMsg?.length > 0 && (
        <Text
          style={{ color: COLORS.warning, ...FONTS.body4, marginTop: "2%" }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: { marginVertical: "10rem" },
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
