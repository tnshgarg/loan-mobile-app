import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import EStyleSheet from "react-native-extended-stylesheet";

const COLOR_MAP = {
  Due: "orange",
  Missed: COLORS.white,
  Paid: COLORS.gray,
  Pending: "orange",
};

const BACKGROUND_COLOR_MAP = {
  Due: "rgba(183, 65, 44, 0.08)",
  Missed: COLORS.warning,
  Paid: COLORS.lightGreen,
  Pending: "rgba(183, 65, 44, 0.08)",
};

const StatusCard = ({ offerType }) => {
  return (
    <View
      style={{
        borderRadius: 50,
        borderColor: COLOR_MAP[offerType],
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "center",
        marginRight: 15,
        backgroundColor: BACKGROUND_COLOR_MAP[offerType],
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
  let offerType = "Missed";
  let amount = offer.eligibleAmount;
  let date = new Date(offer.updatedAt.split(" ")[0]);

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

  let dateString = date.toDateString();
  let day = dateString.split(" ")[2];
  let month = dateString.split(" ")[1];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        if (offerType !== "Missed") {
          navigation.navigate("EWAStack", {
            screen: "EWA_DISBURSEMENT",
            params: { offer: offer },
          });
        }
      }}
    >
      <View style={styles.dateCard}>
        <Text style={{ color: COLORS.gray, ...FONTS.body1 }}>{day}</Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{month}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={{ ...FONTS.body3, color: COLORS.gray }}>₹{amount}</Text>
        {["Due", "Pending"].includes(offerType) ? (
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
            Due date {offer.dueDate}
          </Text>
        ) : null}
      </View>

      <StatusCard offerType={offerType} />
    </TouchableOpacity>
  );
};

const PastDrawsCard = (props) => {
  return (
    <ScrollView style={{ marginTop: "5%" }}>
      {props.data.length > 0 && (
        <Text style={styles.title}>Your past draws</Text>
      )}
      {props.data.map((offer, index) => (
        <OfferCard offer={offer} key={index} />
      ))}
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  container: {
    alignSelf: "center",
    width: "99%",
    flexDirection: "row",
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    marginVertical: "5rem",
    borderRadius: "10rem",
    ...SIZES.shadow,
  },
  dateCard: {
    backgroundColor: COLORS.lightgray_01,
    padding: "10rem",
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    width: "18%",
    borderTopLeftRadius: "10rem",
    borderBottomLeftRadius: "10rem",
  },
  textContainer: {
    flexDirection: "column",
    padding: "15rem",
    flex: 1,
    justifyContent: "center",
  },
  title: { ...FONTS.body3, color: COLORS.black, marginBottom: "10rem" },
});

export default PastDrawsCard;
