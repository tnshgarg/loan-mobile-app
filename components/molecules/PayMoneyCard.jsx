import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import { Icon } from "@react-native-material/core";

const PayMoneyCard = ({ info, navigation, dueDate, amount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.text}>Your total amount due</Text>
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
            }}
          >
            <Text
              style={[styles.text, { ...FONTS.h3, color: COLORS.secondary }]}
            >
              {amount}
            </Text>
          </View>
        </View>
        <PrimaryButton
          title={"Pay now"}
          onPress={() => {
            navigation.navigate("EWA_OFFER");
          }}
          containerStyle={{ width: null, marginTop: 0, height: 40 }}
          titleStyle={{ ...FONTS.h5 }}
        />
      </View>
      <View style={styles.bottomCard} opactiy={0.3}>
        <Icon name="info-outline" size={18} color={COLORS.white} />
        <Text style={[styles.text, { marginLeft: 5 }]}>Due by {dueDate}</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 5,
  },
  row: {
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.moneyCardBg,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bottomCard: {
    paddingHorizontal: "15rem",
    paddingVertical: "10rem",
    alignItems: "center",
    backgroundColor: COLORS.moneyCardBg,
    borderTopWidth: 1.5,
    borderColor: COLORS.lightGray,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    opactiy: 0.5,
    flexDirection: "row",
  },

  col: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: { ...FONTS.body4, color: COLORS.white },
});

export default PayMoneyCard;
