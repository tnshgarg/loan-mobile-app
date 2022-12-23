import { View, Text, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const DisbursementCard = ({ title, data, info, iconName }) => {
  return (
    <View style={styles.container}>
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
          color={COLORS.primary}
          size={18}
        />
        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: 10 }}>
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
          <Text style={styles.label}>{item.subTitle}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
      {info ? (
        <View
          style={[
            styles.row,
            {
              justifyContent: "center",
              marginTop: 5,
              backgroundColor: COLORS.lightGray,
            },
          ]}
        >
          <Text style={{ ...FONTS.body5, color: COLORS.gray }}>{info}</Text>
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
    borderWidth: 0.5,
    borderColor: COLORS.lightgray_01,
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
