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
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        alignSelf: "center",
        backgroundColor: "rgba(183, 65, 44, 0.08)",
      }}
    >
      <Text style={{ color: COLOR_MAP[offerType], ...FONTS.h5 }}>
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
          <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>{day}</Text>
          <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>{month}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginLeft: "5%",

            flex: 1,
          }}
        >
          <Text style={datacard.cardTitle}>₹{amount}</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            Due date {offer.dueDate}
          </Text>
        </View>

        <StatusCard offerType={offerType} />
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
