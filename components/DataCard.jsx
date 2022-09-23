import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { datacard } from "../styles";

const DataCard = (props) => {
  return (
    <>
      {props.data.map((txn,index) => (
        <View style={datacard.card} key={index}>
          <View
            style={{
              backgroundColor: "#DDE5E5",
              paddingHorizontal: "3%",
              borderRadius: 8,
              justifyContent: "flex-start",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#597E8D", alignSelf: "center" }}>
              {txn.day}
            </Text>
            <Text style={{ color: "#597E8D", alignSelf: "center" }}>
              {txn.month}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={datacard.cardTitle}>₹{txn.amount}</Text>
            <Text style={{ color: "#597E8D" }}>Due date {txn.dueDate}</Text>
          </View>
          {txn.paid ? (
            <View
              style={{
                borderRadius: 3,
                borderColor: "green",
                borderWidth: 1,
                paddingHorizontal: "4%",
                justifyContent: "flex-end",
                alignSelf: "center",
                backgroundColor: "rgba(183, 65, 44, 0.08)",
              }}
            >
              <Text style={{ color: "green" }}>Paid</Text>
            </View>
          ) : (
            <View
              style={{
                borderRadius: 3,
                borderColor: "orange",
                borderWidth: 1,
                paddingHorizontal: "4%",
                justifyContent: "flex-end",
                alignSelf: "center",
                backgroundColor: "rgba(183, 65, 44, 0.08)",
              }}
            >
              <Text style={{ color: "orange" }}>Due</Text>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

export default DataCard;
