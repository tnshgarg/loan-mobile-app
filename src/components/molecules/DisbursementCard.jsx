import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS } from "../../constants/Theme";

const DisbursementCard = ({ title, data, info, iconName, variant }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            variant == "dark" ? COLORS.moneyCardBg : COLORS.beige,
        },
      ]}
    >
      <View style={[styles.row, {}]}>
        <Text
          style={{
            ...FONTS.h4,
            color: variant == "dark" ? COLORS.white : COLORS.black,
          }}
        >
          {title}
        </Text>
      </View>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.row,
            { justifyContent: "space-between", paddingVertical: 5 },
          ]}
        >
          <Text
            style={[
              styles.label,
              { color: variant == "dark" ? COLORS.white : COLORS.gray },
            ]}
          >
            {item.subTitle}
          </Text>
          <Text
            style={[
              styles.value,
              { color: variant == "dark" ? COLORS.white : COLORS.black },
            ]}
          >
            {item.value}
          </Text>
        </View>
      ))}
      {info ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLORS.lightGreen, COLORS.lightYellow]}
          style={[
            styles.infoContainer,
            {
              backgroundColor:
                variant == "dark" ? COLORS.moneyCardBgVariant : COLORS.white,
            },
          ]}
        >
          <Text
            style={{
              ...FONTS.body5,
              color: variant == "dark" ? COLORS.white : COLORS.gray,
            }}
          >
            {info}
          </Text>
        </LinearGradient>
      ) : (
        <View style={{ padding: 5 }} />
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    //backgroundColor: COLORS.primaryBackground,
    width: "100%",
    flexDirection: "column",
    //alignItems: "center",
    // borderRadius: 5,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  row: { flexDirection: "row", alignItems: "center", padding: "15rem" },

  listItem: { marginVertical: "5rem" },
  label: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  value: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  text: { paddingLeft: "10rem", ...FONTS.body5, color: COLORS.gray, flex: 1 },
  infoContainer: {
    justifyContent: "center",
    marginTop: "10rem",
    borderBottomLeftRadius: "5rem",
    borderBottomRightRadius: "5rem",
    flexDirection: "row",
    alignItems: "center",
    padding: "10rem",
  },
});

export default DisbursementCard;
