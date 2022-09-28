import React, { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bankform, ewa } from "../styles";

const CollapsibleCard = ({ title, TitleIcon, data, isClosed, info ,Component}) => {
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
          color="green"
          style={{ marginLeft: "auto" }}
          onPress={() => setIsCollapsed(!isCollapsed)}
        />
      </View>
      <Collapsible collapsed={isCollapsed}>
        {Component ? <Component /> : null}
        {data?.map((item, index) => (
          <View
            style={{ flexDirection: "row", width: "100%", marginTop: 5 }}
            key={index}
          >
            <Text>{item.subTitle}</Text>
            <Text style={{ marginLeft: "auto" }}>{item.value}</Text>
          </View>
        ))}
        {info ? (
          <Text style={{ marginTop: 10 }}>
            <Text style={bankform.asterisk}>*</Text>
            {info}
          </Text>
        ) : (
          <View style={ewa.padding}></View>
        )}
      </Collapsible>
    </View>
  );
};

export default CollapsibleCard;
