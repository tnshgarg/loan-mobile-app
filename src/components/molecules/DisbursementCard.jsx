import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

const DisbursementCard = ({ title, data, info, iconName, variant }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variant == "dark" ? COLORS.moneyCardBg : "#f7f6f1",
        },
      ]}
    >
      <View
        style={[
          styles.row,
          {
            marginBottom: 5,
          },
        ]}
      >
        {/* <MaterialCommunityIcons
          name={iconName}
          color={variant == "dark" ? COLORS.white : COLORS.secondary}
          size={18}
        /> */}
        <Text
          style={{
            ...FONTS.body4,
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
            { justifyContent: "space-between", paddingVertical: 6 },
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
            styles.row,
            {
              justifyContent: "center",
              marginTop: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor:
                variant == "dark" ? COLORS.moneyCardBgVariant : COLORS.white,
            },
          ]}
        >
          <Text
            style={{
              ...FONTS.body4,
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
  row: { flexDirection: "row", alignItems: "center", padding: "10rem" },

  listItem: { marginVertical: "5rem" },
  label: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  value: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  text: { paddingLeft: "10rem", ...FONTS.body5, color: COLORS.gray, flex: 1 },
});

export default DisbursementCard;
