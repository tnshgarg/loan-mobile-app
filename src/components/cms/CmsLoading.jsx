import React from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../../constants/Theme";

const CmsLoading = () => {
  return (
    <View>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default CmsLoading;
