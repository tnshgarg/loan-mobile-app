import React, { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bankform, ewa } from "../styles";

const CollapsibleCard = ({ title, TitleIcon, data, isClosed }) => {
  const [isCollapsed, setIsCollapsed] = useState(isClosed);
  return (
    <View style={ewa.loanCard}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ fontWeight: "bold" }}>
          {title}
          {TitleIcon ? <TitleIcon /> : null}
        </Text>
        <Icon
          name={
            isCollapsed
              ? "arrow-down-drop-circle-outline"
              : "arrow-up-drop-circle-outline"
          }
          size={24}
          color="#FF6700"
          style={{ marginLeft: "auto" }}
          onPress={() => setIsCollapsed(!isCollapsed)}
        />
      </View>
      <Collapsible collapsed={isCollapsed}>
        {data.map((item, index) => (
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
