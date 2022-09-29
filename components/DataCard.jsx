import React from "react";
import { View, Text } from "react-native";
import {format} from 'date-fns';
import { datacard } from "../styles";

const COLOR_MAP = {"Missed": "red", "Due": "orange", "Paid": "green"};

const StatusCard = ({offerType}) => {

  return (
    <View
      style={{
        borderRadius: 3,
        borderColor: COLOR_MAP[offerType],
        borderWidth: 1,
        paddingHorizontal: "4%",
        justifyContent: "flex-end",
        alignSelf: "center",
        backgroundColor: "rgba(183, 65, 44, 0.08)",
      }}
    >
      <Text style={{ color: COLOR_MAP[offerType] }}>{offerType}</Text>
    </View> 
  );
  
}

const ParentCard = ({offer, index}) => {

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
    <View style={datacard.card} key={index}>
      <View
        style={{
          backgroundColor: "#DDE5E5",
          paddingHorizontal: "3%",
          borderRadius: 8,
          justifyContent: "flex-start",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "#597E8D", alignSelf: "center" }}>
          {day}
        </Text>
        <Text style={{ color: "#597E8D", alignSelf: "center" }}>
          {month}
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={datacard.cardTitle}>₹{amount}</Text>
        {
          offerType === "Due" &&
          <Text style={{ color: "#597E8D" }}>Due date {offer.dueDate}</Text> 
        }
      </View>
      <StatusCard offerType={offerType} />
    </View>
  );

}

const DataCard = (props) => {

  return (
    <>
      {props.data.map((offer, index) => (
        <ParentCard offer={offer} index={index} />
      ))}
    </>
  );

};

export default DataCard;
