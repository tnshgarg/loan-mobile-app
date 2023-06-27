import React from "react";
import { TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsTwoColumn = ({ children, widths, styling, navigate }) => {
  const safeChildren = children || [];
  let onPress = () => {}
  if (navigate)
    onPress = () => {
      navigationHelper(navigate)
    }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, { ...styling }]}
      disabled={!navigate}
    >
      {safeChildren?.map((child, index) => (
        <View
          key={index}
          style={[
            styles.col,
            {
              padding: 0,
              width: widths?.[index] || "50%",
              border: 1,
            },
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
    margin: "15rem",
  },
  col: {
    flexDirection: "column",
    width: "50%",
  },
});

export default CmsTwoColumn;
