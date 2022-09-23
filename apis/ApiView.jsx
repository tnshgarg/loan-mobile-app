import React from "react";
import { Button } from "@react-native-material/core";

export default ApiView = (props) => {
  const { disabled, goForFetch, loading, style, title} = props;
  return (
    <Button
      title={loading ? "Verifying" : title || "Continue"}
      uppercase={false}
      type="solid"
      color="#4E46F1"
      style={style}
      disabled={loading || disabled}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};
