import React, { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { bankform, ewa } from "../styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "./PrimaryButton";

const CollapsibleCard = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <View style={ewa.loanCard}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ fontWeight: "bold" }}>
          {props.title}
          <Icon name="information-outline" size={24} color="#FF6700" />
        </Text>
        <Icon
          name="arrow-down-drop-circle-outline"
          size={24}
          color="#FF6700"
          style={{ marginLeft: "auto" }}
          onPress={() => setIsCollapsed(!isCollapsed)}
        />
      </View>
      <Collapsible collapsed={isCollapsed}>
        {props.data.map((item, index) => (
          <View
            style={{ flexDirection: "row", width: "100%", marginTop: 10 }}
            key={index}
          >
            <Text>{item.subTitle}</Text>
            <Text style={{ marginLeft: "auto" }}>{item.value}</Text>
          </View>
        ))}
        <Text style={{ marginTop: 20 }}>
          <Text style={bankform.asterisk}>*</Text>Money will be deducted from
          your upcoming salary
        </Text>
      </Collapsible>
    </View>
  );
};

export default CollapsibleCard;
