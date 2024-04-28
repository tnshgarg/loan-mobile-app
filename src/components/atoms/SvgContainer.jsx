import { View, Text } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";

const SvgContainer = ({ children, width, height }) => {
  return <View style={styles(width, height).container}>{children}</View>;
};

const styles = (width, height) =>
  EStyleSheet.create({
    container: {
      height: `${height}rem`,
      width: `${width}rem`,
    },
  });

export default SvgContainer;
