import React from "react";
import { Text, View } from "react-native";

const CmsDummy3 = ({ route }) => {
  console.log("route params: ", route.params.blogKey);
  return (
    <View>
      <Text>CmsDummy3</Text>
    </View>
  );
};

export default CmsDummy3;
