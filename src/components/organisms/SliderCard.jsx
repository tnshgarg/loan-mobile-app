import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import HelpCard from "../atoms/HelpCard";
import InfoCard from "../atoms/InfoCard";

const SliderCard = ({ info, iconName, amount, setAmount, eligibleAmount }) => {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          padding: 15,
        }}
      >
        <Text style={{ ...FONTS.body4, color: COLORS.secondary }}>
          Available Salary:
          <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>
            ₹{eligibleAmount}
          </Text>
        </Text>
      </View>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.secondary,
            alignSelf: "center",
          }}
        >
          I want to withdraw
        </Text>
        <Text
          style={{
            ...FONTS.body1,
            color: COLORS.secondary,
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
                ...FONTS.body3,
                color: COLORS.gray,
              }}
            >
              ₹1000
            </Text>
          </View>
          <View style={styles.col}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.gray,
              }}
            >
              ₹{eligibleAmount}
            </Text>
          </View>
        </View>
        <InfoCard info="Takes upto 1 business day" />
        <InfoCard
          info="The withdrawl will be deducted from your upcoming paycheck"
          variant="gradient"
        />
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
    width: "40rem",
    height: "18rem",
    borderWidth: "3rem",
    backgroundColor: "#377476",
    borderColor: COLORS.white,
    ...SIZES.shadow,
    borderRadius: "50rem",
  },
});

export default SliderCard;
