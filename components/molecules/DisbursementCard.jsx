import { View, Text, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const DisbursementCard = ({ title, data, info, iconName, variant }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            variant == "dark" ? COLORS.moneyCardBg : COLORS.white,
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
        <MaterialCommunityIcons
          name={iconName}
          color={variant == "dark" ? COLORS.white : COLORS.secondary}
          size={18}
        />
        <Text
          style={{
            ...FONTS.h4,
            color: variant == "dark" ? COLORS.white : COLORS.secondary,
            marginLeft: 10,
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
              { color: variant == "dark" ? COLORS.white : COLORS.secondary },
            ]}
          >
            {item.value}
          </Text>
        </View>
      ))}
      {info ? (
        <View
          style={[
            styles.row,
            {
              justifyContent: "center",
              marginTop: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor:
                variant == "dark"
                  ? COLORS.moneyCardBgVariant
                  : COLORS.lightGray,
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
        </View>
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
    borderRadius: 5,
    backgroundColor: COLORS.white,
    elevation: 3,
    marginVertical: "5rem",
  },
  row: { flexDirection: "row", alignItems: "center", padding: "10rem" },

  listItem: { marginVertical: "5rem" },
  label: {
    ...FONTS.body5,
    color: COLORS.black,
  },
  value: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  text: { paddingLeft: "10rem", ...FONTS.body5, color: COLORS.gray, flex: 1 },
});

export default DisbursementCard;
