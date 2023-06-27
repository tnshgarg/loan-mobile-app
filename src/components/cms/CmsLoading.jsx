import React from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../../constants/Theme";

const CmsLoading = () => {
  return (
    <View style={{flex: 1,"height": "100%",paddingTop: "50%",alignItems: "center"}}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default CmsLoading;
