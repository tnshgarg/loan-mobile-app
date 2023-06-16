import React from "react";
import { Text, View } from "react-native";

const CmsDummy2 = ({ route }) => {
  console.log("route params: ", route.params.blogKey);
  return (
    <View>
      <Text>CmsDummy2</Text>
    </View>
  );
};

export default CmsDummy2;
