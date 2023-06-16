import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsTwoColumn = ({ children, widths, styling }) => {
  const safeChildren = children || [];
  console.log({ styling });
  return (
    <View style={[styles.row, { ...styling }]}>
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
            { 
              padding: 0,
              width: widths[index],
              border: "1px solid black"
            }
          ]}
        >
          {child.element(child)}
        </View>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  col: {
    flexDirection: "column",
    width: "50%",
  },
});

export default CmsTwoColumn;
