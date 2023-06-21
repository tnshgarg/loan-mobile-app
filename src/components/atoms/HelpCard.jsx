import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";

const HelpCard = ({ text, onPress }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[COLORS.lightGreen, COLORS.lightYellow]}
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
        <Text style={styles.text}>{strings.needHelp}</Text>
        <Text style={styles.text}>
          {/* <TouchableOpacity activeOpacity={0.7}> */}
          <Text
            onPress={onPress}
            style={{
              ...styles.text,
              textDecorationLine: "underline",
              color: "#377476",
            }}
          >
            {strings.clickHere}
          </Text>
          {/* </TouchableOpacity> */} to see how to complete your {text}{" "}
          verification.
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
