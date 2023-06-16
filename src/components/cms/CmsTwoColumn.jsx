import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";

const CmsTwoColumn = ({ children, firstColumnWidth }) => {
  const safeChildren = children || [];
  console.log({ firstColumnWidth });
  return (
    <View style={styles.row}>
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
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
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: COLORS.lightGray,
    borderRadius: "10rem",
    padding: "15rem",
  },

  row: {
    // flexDirection: "row",
    // width: "100%",
    // alignItems: "center",
    // justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    width: "50%",
  },
});

export default CmsTwoColumn;
