import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLORS, FONTS } from "../../constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";

const COLOR_MAP = {
  Due: "orange",
  Missed: COLORS.warning,
  Paid: COLORS.primary,
  Pending: "orange",
};

const BACKGROUND_COLOR_MAP = {
  Due: "rgba(183, 65, 44, 0.08)",
  Missed: COLORS.warningBackground,
  Paid: COLORS.primaryBackground,
  Pending: "rgba(183, 65, 44, 0.08)",
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
    <TouchableNativeFeedback
      onLongPress={() => {
        if (offerType !== "Missed") {
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
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
            Due date {offer.dueDate}
          </Text>
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
    paddingVertical: "10rem",
    paddingHorizontal: "5rem",
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
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
  title: { ...FONTS.h4, color: COLORS.gray, marginBottom: "3%" },
});

export default PastDrawsCard;
