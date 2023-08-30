import React from "react";
import { TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsThreeColumn = ({
  children,
  secondColumnStyle,
  styling,
  navigate,
  widths,
}) => {
  const safeChildren = children || [];

  return (
    <TouchableOpacity
      style={[styles.row, { ...styling }]}
      onPress={() => {
        navigationHelper(navigate);
      }}
    >
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
            { width: widths?.[index] || "30%" },
            // { paddingRight: index == 0 ? 10 : null },
            // { paddingLeft: index == 0 ? 10 : null },
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
    // flexWrap: "wrap",
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
