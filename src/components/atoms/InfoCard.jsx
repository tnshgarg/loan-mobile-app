import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";

const InfoCard = ({
  title,
  info,
  variant,
  containerStyle,
  infoStyle,
  icon,
  color,
}) => {
  return variant == "gradient" ? (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[COLORS.lightGreen, COLORS.lightYellow]}
      style={[styles.gradientContainer, { ...containerStyle }]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.lightGreen, COLORS.lightYellow]}
        style={{
          padding: 5,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color={COLORS.gray}
        />
      </LinearGradient>
      <View
        style={{ flexDirection: "column", flex: 1, alignItems: "flex-start" }}
      >
        {title && (
          <Text style={[styles.text, { color: COLORS.black, ...FONTS.body3 }]}>
            {title}
          </Text>
        )}
        <Text style={[styles.text, { ...infoStyle }]}>{info}</Text>
      </View>
    </LinearGradient>
  ) : (
    <View
      accessibilityLabel="InfoCard"
      style={[styles.container, { ...containerStyle }]}
    >
      <MaterialCommunityIcons
        name={icon || "information-outline"}
        size={20}
        color={color || COLORS.primary}
      />
      <View
        style={{ flexDirection: "column", flex: 1, alignItems: "flex-start" }}
      >
        <Text style={styles.text}>{info}</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    //backgroundColor: COLORS.primaryBackground,
    width: "100%",
    marginVertical: "10rem",
    // padding: "10rem",
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  gradientContainer: {
    width: "100%",
    marginVertical: "15rem",
    padding: "10rem",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: "5rem",
  },
  text: { paddingLeft: "10rem", ...FONTS.body4, color: COLORS.gray },
});

export default InfoCard;
