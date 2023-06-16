import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsThreeColumn = ({ children, secondColumnStyle, styling }) => {
  const safeChildren = children || [];

  return (
    <View style={[styles.row, { ...styling }]}>
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
            index == 1 ? { ...secondColumnStyle } : null,
            { paddingRight: index == 0 ? 10 : null },
            { paddingLeft: index == 0 ? 10 : null },
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
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    padding: "10rem",
  },
  col: {
    flexDirection: "column",
  },
});

export default CmsThreeColumn;
