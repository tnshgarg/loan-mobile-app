import React from "react";
import { Button } from "@react-native-material/core";
import { COLORS } from "../constants/Theme";
import { styles } from "../styles";

const ApiView = (props) => {
  const { disabled, goForFetch, loading, style, title } = props;

  return (
    <Button
      title={loading ? "Verifying" : title || "Continue"}
      uppercase={false}
      type="solid"
      contentContainerStyle={styles.ButtonContainer}
      titleStyle={styles.btnText}
      style={[
        styles.btn,
        { backgroundColor: disabled ? COLORS.gray : COLORS.primary },
      ]}
      disabled={loading || disabled}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default ApiView;
