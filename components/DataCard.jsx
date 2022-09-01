import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { datacard } from "../styles";

const DataCard = (props) => {
  return (
    <View style={datacard.card}>
      <Text style={datacard.cardTitle}>{props.title}</Text>
      {props.data.map((item, index) => {
        return (
          <View
            style={{ flexDirection: "row", width: "100%", marginTop: 10 }}
            key={index}
          >
            <Text>{item.subtitle}</Text>
            <Text style={{ marginLeft: "auto" }}>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default DataCard;
