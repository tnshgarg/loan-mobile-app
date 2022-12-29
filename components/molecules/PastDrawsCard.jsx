import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { datacard } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";

const COLOR_MAP = {
  Due: "orange",
  Missed: COLORS.warning,
  Paid: COLORS.primary,
  Pending: "orange",
};

const StatusCard = ({ offerType }) => {
  return (
    <View
      style={{
        borderRadius: 3,
        borderColor: COLOR_MAP[offerType],
        borderWidth: 1,
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        alignSelf: "center",
        backgroundColor: "rgba(183, 65, 44, 0.08)",
      }}
    >
      <Text style={{ color: COLOR_MAP[offerType], ...FONTS.body5 }}>
        {offerType}
      </Text>
    </View>
  );
};

const OfferCard = ({ offer }) => {
  const navigation = useNavigation();
  var offerType = "Missed";
  var amount = offer.eligibleAmount;
  var date = new Date(offer.updatedAt.split(" ")[0]);

  if (offer.paid) {
    offerType = "Paid";
    amount = offer.loanAmount;
    date = new Date(offer.availedAt.split(" ")[0]);
  } else if (offer.disbursed) {
    offerType = "Due";
    amount = offer.loanAmount;
    date = new Date(offer.availedAt.split(" ")[0]);
  } else if (offer.availed) {
    offerType = "Pending";
    amount = offer.loanAmount;
    date = new Date(offer.availedAt.split(" ")[0]);
  }

  var dateString = date.toDateString();
  var day = dateString.split(" ")[2];
  var month = dateString.split(" ")[1];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => {
        if (offerType !== "Missed") {
          navigation.navigate("EWAStack", {
            screen: "EWA_DISBURSEMENT",
            params: { offer: offer },
          });
        }
      }}
    >
      <View style={datacard.card}>
        <View
          style={{
            backgroundColor: COLORS.lightGray,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            justifyContent: "flex-start",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{day}</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{month}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginLeft: "5%",

            flex: 1,
          }}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.black }}>₹{amount}</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
            Due date {offer.dueDate}
          </Text>
        </View>

        <StatusCard offerType={offerType} />
      </View>
    </TouchableOpacity>
  );
};

const PastDrawsCard = (props) => {
  return props.data.map((offer, index) => (
    <OfferCard offer={offer} key={index} />
  ));
};

export default PastDrawsCard;
