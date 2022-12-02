import { View, Text } from "react-native";
import React from "react";
import FormInput from "../atoms/FormInput";
import { COLORS, FONTS } from "../../constants/Theme";

const LoginInput = ({ phoneNumber, setPhoneNumber }) => {
  return (
    <FormInput
      //placeholder="Enter mobile number"
      containerStyle={{ marginVertical: 15, borderColor: COLORS.primary }}
      autoCompleteType="tel"
      keyboardType="phone-pad"
      value={phoneNumber}
      onChange={setPhoneNumber}
      autoFocus={true}
      maxLength={10}
      inputStyle={{ ...FONTS.h4, color: COLORS.secondary }}
      prependComponent={
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRightWidth: 2,
            borderColor: COLORS.lightGray,
            marginRight: 10,
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
            + 91
          </Text>
        </View>
      }
      appendComponent={
        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
          {phoneNumber.length}/10
        </Text>
      }
    />
  );
};

export default LoginInput;
