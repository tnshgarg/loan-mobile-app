import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

const SliderCard = ({ info, iconName, amount, setAmount, eligibleAmount }) => {
  return (
    <View style={styles.container}>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.gray,
            alignSelf: "center",
          }}
        >
          Withdrawal Amount
        </Text>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.black,
            alignSelf: "center",
          }}
        >
          ₹{amount}
        </Text>

        {eligibleAmount >= 1000 ? (
          <Slider
            minimumValue={1000}
            maximumValue={eligibleAmount}
            step={100}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor={COLORS.primary}
            value={amount}
            onValueChange={(value) => setAmount(value)}
          />
        ) : null}

        <View
          style={[styles.row, { padding: 0, justifyContent: "space-between" }]}
        >
          <View style={styles.col}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}
            >
              ₹1000
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.gray,
              }}
            >
              (minimum)
            </Text>
          </View>
          <View style={styles.col}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}
            >
              ₹{eligibleAmount}
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.gray,
              }}
            >
              (maximum)
            </Text>
          </View>
        </View>
      </View>

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
          <MaterialCommunityIcons
            name={iconName}
            color={COLORS.gray}
            size={20}
          />
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.gray,
              // flex: 1,
              paddingLeft: 10,
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
    width: "100%",
    flexDirection: "column",
    borderRadius: 4,
    backgroundColor: COLORS.white,
    ...SIZES.shadow,
    marginVertical: "10rem",
    // borderWidth: 0.5,
    borderColor: COLORS.lightgray_01,
  },
  row: { flexDirection: "row", alignItems: "center", padding: "8rem" },
  col: { flexDirection: "column", alignItems: "center" },
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
  track: {
    height: 5,
    borderRadius: 1,
    backgroundColor: COLORS.lightGray,
  },
  thumb: {
    width: "25rem",
    height: "25rem",
    borderWidth: "4rem",
    backgroundColor: COLORS.primary,
    borderColor: COLORS.white,
    ...SIZES.shadow,
    borderRadius: "50rem",
  },
});

export default SliderCard;
