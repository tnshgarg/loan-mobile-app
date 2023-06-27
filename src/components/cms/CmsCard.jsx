import React from "react";
import { TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import { navigationHelper } from "../../helpers/CmsNavigationHelper";

const CmsCard = ({ children, styling, gradientColors, navigate }) => {
  console.log("Navigate: ", navigate);

  const safeChildren = children || [];
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!navigate}
      onPress={() => {
        if (navigate) {
          navigationHelper(navigate);
        }
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors ?? ["#d6f3af", "#eaf98c"]}
        style={[styles.container, { ...styling }]}
      >
        {safeChildren?.map((child, index) => (
          <View key={index} style={styles.col}>
            {child.element(child)}
          </View>
        ))}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "5rem",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10rem",
  },
});

export default CmsCard;
