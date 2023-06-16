import { View, Text } from "react-native";
import React from "react";
import FormInput from "../atoms/FormInput";
import { COLORS, FONTS } from "../../constants/Theme";

const LoginInput = ({ phoneNumber, setPhoneNumber, accessibilityLabel }) => {
  return (
    <FormInput
      placeholder="Enter mobile number"
      accessibilityLabel={accessibilityLabel}
      containerStyle={{ marginVertical: 15 }}
      autoCompleteType="tel"
      keyboardType="phone-pad"
      value={phoneNumber}
      onChange={setPhoneNumber}
      autoFocus={true}
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
