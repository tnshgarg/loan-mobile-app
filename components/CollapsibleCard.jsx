import React, { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/Theme";
import { bankform, ewa } from "../styles";

const CollapsibleCard = ({
  title,
  TitleIcon,
  data,
  isClosed,
  info,
  Component,
  ComponentProps,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isClosed);
  return (
    <View style={ewa.loanCard}>
      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}>
            {title}
          </Text>
          {TitleIcon ? <TitleIcon /> : null}
        </View>
        <Icon
          name={
            isCollapsed
              ? "arrow-down-drop-circle-outline"
              : "arrow-up-drop-circle-outline"
          }
          size={24}
          color={COLORS.primary}
          style={{ marginLeft: "auto" }}
          onPress={() => setIsCollapsed(!isCollapsed)}
        />
      </View>
      <Collapsible collapsed={isCollapsed}>
        {Component ? <Component {...ComponentProps} /> : null}
        {data?.map((item, index) => (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 5,
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Text
              style={{
                ...FONTS.h4,
                flex: 1,
              }}
            >
              {item.subTitle}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                flex: 2,
                textAlign: "right",
              }}
            >
              {item.value}
            </Text>
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
