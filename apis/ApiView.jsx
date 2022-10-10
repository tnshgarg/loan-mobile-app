import React from "react";
import { Button } from "@react-native-material/core";

const ApiView = (props) => {

  const { disabled, goForFetch, loading, style, title } = props;

  return (
    <Button
      title={loading ? "Verifying" : title || "Continue"}
      uppercase={false}
      type="solid"
      color="#2CB77C"
      style={style}
      disabled={loading || disabled}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default ApiView;
