import { View, Text, Image } from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import { TouchableOpacity } from "react-native";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsThreeColumn = ({ children, secondColumnStyle, styling, navigate }) => {
  const safeChildren = children || [];

  return (
    <TouchableOpacity
      style={[styles.row, { ...styling }]}
      onPress={() => {
        navigationHelper({
          type: navigate.type,
          screen: navigate.screen,
          // params: { blogKey: navigate.screen },
        });
      }}
    >
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
    </TouchableOpacity>
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
    backgroundColor: COLORS.white,
  },
  col: {
    flexDirection: "column",
  },
});

export default CmsThreeColumn;
