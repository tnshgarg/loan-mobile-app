import React from "react";
import { Button } from "@react-native-material/core";
import { COLORS } from "../constants/Theme";

const ApiView = (props) => {
  const { disabled, goForFetch, loading, style, title } = props;

  return (
    <Button
      title={loading ? "Verifying" : title || "Continue"}
      uppercase={false}
      type="solid"
      color={COLORS.primary}
      style={style}
      disabled={loading || disabled}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default ApiView;
