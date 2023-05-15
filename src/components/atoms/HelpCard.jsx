import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import LinearGradient from "react-native-linear-gradient";

const HelpCard = ({ text }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["rgba(110, 220, 133,0.3)", "rgba(237, 251, 139,0.3)"]}
      style={styles.container}
    >
      <View
        style={{
          padding: 5,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={20}
          color={COLORS.gray}
        />
      </View>

      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={styles.text}>Need help?</Text>
        <Text style={styles.text}>
          <Text style={{ textDecorationLine: "underline", color: "#377476" }}>
            Click here
          </Text>{" "}
          to see how to complete your {text} verification.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "15rem",
    padding: "10rem",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  text: { paddingLeft: "10rem", ...FONTS.body3, color: COLORS.black },
});

export default HelpCard;
