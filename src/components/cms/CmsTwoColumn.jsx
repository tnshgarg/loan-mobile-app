import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsTwoColumn = ({ children, firstColumnWidth, styling }) => {
  const safeChildren = children || [];
  console.log({ firstColumnWidth });
  console.log({ styling });
  return (
    <View style={[styles.row, { ...styling }]}>
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
            { paddingRight: index == 0 ? 10 : null },
            { paddingLeft: index == 0 ? 10 : null },
            firstColumnWidth
              ? {
                  width: index == 0 ? firstColumnWidth : "30%",
                }
              : null,
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
