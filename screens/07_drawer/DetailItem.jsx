import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";

const DetailItem = ({ label, value, divider }) => {
  return (
    <View style={{ paddingTop: 15 }}>
      <Text style={{ ...FONTS.h4 }}>{label}</Text>
      {value == "Not Provided" ? (
        <Text
          style={{
            ...FONTS.h5,
            paddingTop: 8,
            color: COLORS.gray,
          }}
        >
          {value}
        </Text>
      ) : (
        <Text style={{ ...FONTS.h5, paddingTop: 8 }}>{value}</Text>
      )}
      {divider && (
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "lightgray",
            marginTop: 10,
          }}
        />
      )}
    </View>
  );
};

export default DetailItem;
