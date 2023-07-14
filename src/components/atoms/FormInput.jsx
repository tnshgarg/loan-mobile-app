import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { COLORS, FONTS } from "../../constants/Theme";

const FormInput = ({
  containerStyle,
  value,
  label,
  labelStyle,
  placeholder,
  multiline,
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
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: errorMsg ? COLORS.warning : COLORS.lightGray,
          },
        ]}
      >
        {prependComponent}
        {/* <TextInput
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
        /> */}
        <FloatingLabelInput
          testID={testID}
          containerStyles={{
            borderWidth: 0,
            height: 70,
            maxWidth: multiline ? "100%" : "70%",
          }}
          inputStyles={{
            ...FONTS.body4,
            color: COLORS.black,
            paddingLeft: 5,
            ...inputStyle,
            // backgroundColor: COLORS.secondary,
          }}
          label={placeholder}
          labelStyles={{
            ...FONTS.body2,
            backgroundColor: COLORS.white,
            paddingHorizontal: 5,
          }}
          customLabelStyles={{
            colorFocused: COLORS.gray,
            fontSizeFocused: 12,
            colorBlurred: COLORS.gray,
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
          multiline={multiline}
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
    height: 50,
    //paddingHorizontal: SIZES.padding,
    alignItems: "center",
    borderRadius: "50rem",
    width: "100%",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    paddingHorizontal: "10rem",
  },
});

export default FormInput;
