import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLORS, FONTS } from "../../constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";
import Analytics, { InteractionTypes } from "../../helpers/analytics/commonAnalytics";

const COLOR_MAP = {
  Due: "orange",
  Missed: COLORS.warning,
  Paid: COLORS.primary,
  Pending: "orange",
  Rejected: "red"
};

const BACKGROUND_COLOR_MAP = {
  Due: "rgba(183, 65, 44, 0.08)",
  Missed: COLORS.warningBackground,
  Paid: COLORS.primaryBackground,
  Pending: "rgba(183, 65, 44, 0.08)",
  Rejected: "rgba(183, 65, 44, 0.08)",
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
        backgroundColor: BACKGROUND_COLOR_MAP[offerType],
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

  if (offer.availed) {
    date = new Date(offer.availedAt.split(" ")[0]);
    amount = offer.loanAmount;
  }

  if (offer.paid) {
    offerType = "Paid";
  } else if (offer.disbursed) {
    offerType = "Due";
  } else if (offer.availed) {
    offerType = "Pending";
  } else if (offer.rejected) {
    offerType = "Rejected";  
  }

  var dateString = date.toDateString();
  var day = dateString.split(" ")[2];
  var month = dateString.split(" ")[1];

  return (
    <TouchableNativeFeedback
      onPress={() => {
        if (offerType !== "Missed") {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            component: "Money",
            action: "OfferDetailsClick",
            status: "",
            offer: offer.offerId
          });
          navigation.navigate("EWAStack", {
            screen: "EWA_DISBURSEMENT",
            params: { offer: offer },
          });
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.dateCard}>
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{day}</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{month}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ ...FONTS.h4, color: COLORS.black }}>₹{amount}</Text>
          {
            ["Due", "Pending"].includes(offerType) 
            ?
            <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
              Due date {offer.dueDate}
            </Text>
            :
            null
          }
        </View>

        <StatusCard offerType={offerType} />
      </View>
    </TouchableNativeFeedback>
  );
};

const PastDrawsCard = (props) => {
  return (
    <ScrollView style={{ marginTop: "5%" }}>
      <Text style={styles.title}>Your past draws</Text>
      {props.data.map((offer, index) => (
        <OfferCard offer={offer} key={index} />
      ))}
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  container: {
    alignSelf: "center",
    paddingVertical: "7rem",
    paddingHorizontal: "5rem",
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth:  "0.75rem",
    borderTopWidth:  "0.75rem",
    borderColor: COLORS.lightGray,
    justifyContent: "space-between",
  },
  dateCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    paddingVertical: "5rem",
    paddingHorizontal: "10rem",
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: "15rem",
    flex: 1,
    justifyContent: "center",
  },
  title: { ...FONTS.body3, color: COLORS.gray, marginBottom: "3%" },
});

export default PastDrawsCard;
