import { View, Text } from "react-native";
import React from "react";

const DetailItem = ({ label, value, divider }) => {
  return (
    <View style={{ paddingTop: 15, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 14 }}>{label}</Text>
      {value == "Not Provided" ? (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            paddingTop: 8,
            color: "gray",
          }}
        >
          {value}
        </Text>
      ) : (
        <Text style={{ fontSize: 16, fontWeight: "bold", paddingTop: 8 }}>
          {value}
        </Text>
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
