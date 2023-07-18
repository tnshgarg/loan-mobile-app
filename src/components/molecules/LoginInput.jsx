import React from "react";
import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import FormInput from "../atoms/FormInput";
import { showToast } from "../atoms/Toast";

const LoginInput = ({
  phoneNumber,
  setPhoneNumber,
  accessibilityLabel,
  autoFocus,
}) => {
  return (
    <FormInput
      placeholder={strings.enterMobileNumber}
      accessibilityLabel={accessibilityLabel}
      containerStyle={{ marginVertical: 15 }}
      autoCompleteType="tel"
      keyboardType="phone-pad"
      value={phoneNumber}
      onChange={(value) => {
        let filteredString = value
        if (value) {
          filteredString  = value.replace(/[^\d.-]+/g,"")
        }
        if (filteredString != value || value.length > 10)
          showToast("Please Enter a Valid 10 digit Mobile Number")

        setPhoneNumber(filteredString.substr(Math.max(0,filteredString.length - 11)))
      }}
      autoFocus={autoFocus}
      maxLength={10}
      inputStyle={{ ...FONTS.h3, color: COLORS.secondary }}
      prependComponent={
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "70%",
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.secondary,
              paddingRight: 10,
            }}
          >
            +91
          </Text>
        </View>
      }
      appendComponent={
        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
          {phoneNumber?.length ?? 0}/10
        </Text>
      }
    />
  );
};

export default LoginInput;
