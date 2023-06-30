import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BankVariant from "../../assets/BankVariant.svg";
import Rupee from "../../assets/Rupee.svg";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import InfoCard from "../atoms/InfoCard";
import SvgContainer from "../atoms/SvgContainer";

const SliderCard = ({
  info,
  iconName,
  amount,
  setAmount,
  eligibleAmount,
  accountNumber,
  bankName,
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: COLORS.lightGray,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <SvgContainer height={24} width={24}>
          <Rupee />
        </SvgContainer>
        <Text
          style={{ ...FONTS.body4, color: COLORS.secondary, paddingLeft: 10 }}
        >
          {strings.availableSalary}:{" "}
          <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>
            ₹{eligibleAmount}
          </Text>
        </Text>
      </View>
      <View
        style={{
          padding: 20,
          borderBottomWidth: 0.5,
          borderColor: COLORS.lightGray,
        }}
      >
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.secondary,
            alignSelf: "center",
          }}
        >
          {strings.iWantToWithdraw}
        </Text>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.secondary,
            alignSelf: "center",
            fontSize: 48,
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
                color: COLORS.gray,
              }}
            >
              ₹1000
            </Text>
          </View>
          <View style={styles.col}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.gray,
              }}
            >
              ₹{eligibleAmount}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          // borderBottomWidth: 1,
          // borderColor: COLORS.lightGray,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 15,
            borderWidth: 0.5,
            borderColor: COLORS.lightGray,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: "#f8fcfd",
          }}
        >
          <SvgContainer height={42} width={42}>
            <BankVariant />
          </SvgContainer>
          <View style={{ flexDirection: "column", paddingLeft: 15 }}>
            <Text
              style={{ ...FONTS.body3, color: COLORS.black, marginBottom: 5 }}
            >
              {`${strings.transferTo}`.replace(
                "{{accountNumber}}",
                accountNumber
              )}
            </Text>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[COLORS.lightGreen, COLORS.lightYellow]}
              style={{ padding: 5, borderRadius: 5, alignSelf: "flex-start" }}
            >
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                {bankName || strings.bankAccount}
              </Text>
            </LinearGradient>
          </View>
        </View>
        <InfoCard info={strings.takeBusinessDays} />
        <InfoCard
          info={strings.withdrawalDeduction}
          variant="gradient"
          containerStyle={{ marginVertical: 0 }}
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
        <></>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: "10rem",
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
