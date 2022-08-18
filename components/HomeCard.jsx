import React from "react";
import { Text, View } from "react-native";
import { Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { card } from "../styles";

export default HomeCard = (props) => {
  const navigation = useNavigation();
  return (
    <View style={card.alertCard}>
      <Icon name="info-outline" size={20} color="red" />
      <Text style={{ paddingRight: 12 }}>
        <Text style={card.infoText}>
          {props.title}
          {"\n \n"}
        </Text>
        {props.message.map((item, index) =>
          item != null ? (
            <Text
              key={index}
              style={card.alertText}
              onPress={() =>
                navigation.navigate("KYC", {
                  screen: item,
                })
              }
            >
              {item}
              {"\n"}
            </Text>
          ) : null
        )}
      </Text>
    </View>
  );
};
