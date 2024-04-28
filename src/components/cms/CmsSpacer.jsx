import EStyleSheet from "react-native-extended-stylesheet";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const CmsSpacer = ({ height }) => {

  const style = EStyleSheet.create({
    spacer: {
      width: "100%",
      marginTop: height
    },
  });

  return (
    <View style={style.spacer}>
      <Text> </Text>
    </View>
  );
};

export default CmsSpacer;
