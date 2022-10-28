import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { format } from "date-fns";
import { datacard } from "../styles";
import { COLORS } from "../constants/Theme";

const COLOR_MAP = {
  Missed: COLORS.warning,
  Due: "orange",
  Paid: COLORS.primary,
};

const StatusCard = ({ offerType }) => {
  return (
    <View
      style={{
        borderRadius: 3,
        borderColor: COLOR_MAP[offerType],
        borderWidth: 1,
        paddingHorizontal: "10%",
        alignSelf: "center",
        backgroundColor: "rgba(183, 65, 44, 0.08)",
      }}
    >
      <Text style={{ color: COLOR_MAP[offerType], fontWeight: "bold" }}>
        {offerType}
      </Text>
    </View>
  );
};

const OfferCard = ({ offer }) => {
  const navigation = useNavigation();
  var offerType = "Missed";
  var amount = offer.eligibleAmount;
  var timestamp = new Date(offer.updatedAt);

  if (offer.paid) {
    offerType = "Paid";
    amount = offer.loanAmount;
    timestamp = new Date(offer.availedAt);
  } else if (offer.availed) {
    offerType = "Due";
    amount = offer.loanAmount;
    timestamp = new Date(offer.availedAt);
  }

  var day = format(timestamp, "dd");
  var month = format(timestamp, "MMM");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => {
        if (offerType !== "Missed") {
          navigation.navigate("EWA_DISBURSEMENT", { offer: offer });
        }
      }}
    >
      <View style={datacard.card}>
        <View
          style={{
            //backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.primary,
            paddingHorizontal: "3%",
            borderRadius: 5,
            padding: 3,
            justifyContent: "flex-start",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.primary }}>{day}</Text>
          <Text style={{ color: COLORS.primary }}>{month}</Text>
        </View>
        <View style={{ flexDirection: "column", marginLeft: "10%" }}>
          <Text style={datacard.cardTitle}>₹{amount}</Text>
          <Text style={{ color: COLORS.gray }}>Due date {offer.dueDate}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "center", marginLeft: "10%" }}>
          <StatusCard offerType={offerType} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Offers = (props) => {
  return (
    <ScrollView
      style={{ height: "63%", marginTop: "1.5%" }}
      showsVerticalScrollIndicator={false}
    >
      {props.data.map((offer, index) => (
        <OfferCard offer={offer} key={index} />
      ))}
    </ScrollView>
  );
};

export default Offers;
