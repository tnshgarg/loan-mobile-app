import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";
import { navigationRef } from "../../navigators/RootNavigation";

const COLOR_MAP = {
  Due: "orange",
  Missed: COLORS.white,
  Paid: COLORS.gray,
  Pending: "orange",
  Rejected: "red",
};

const BACKGROUND_COLOR_MAP = {
  Due: "rgba(183, 65, 44, 0.08)",
  Missed: COLORS.warning,
  Paid: COLORS.lightGreen,
  Pending: "rgba(183, 65, 44, 0.08)",
  Rejected: "rgba(183, 65, 44, 0.08)",
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

  let dateString = date.toDateString();
  let day = dateString.split(" ")[2];
  let month = dateString.split(" ")[1];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        if (offerType !== "Missed") {
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            flow: "money",
            screen: "pastWithdrawals",
            action: "WITHDRAWALCARD",
            offer: offer.offerId,
          });
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
    <>
      {props.data.length > 0 && props.screenType == "half" ? (
        <View style={styles.pastDrawsContainer}>
          <Text style={styles.title}>Your past draws</Text>
          <TouchableOpacity
            onPress={() =>
              navigationRef.navigate("CmsStack", { screen: "CmsPastDraws" })
            }
            activeOpacity={0.92}
            style={styles.seeAllContainer}
          >
            <Text style={styles.seeAll}>See All</Text>
            <MaterialCommunityIcons
              name="chevron-right-circle"
              color={COLORS.primary}
              size={15}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <ScrollView style={{ marginTop: "1%" }}>
        {props.data.map((offer, index) => (
          <OfferCard offer={offer} key={index} />
        ))}
      </ScrollView>
    </>
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
  seeAll: {
    color: COLORS.primary,
    marginRight: 5,
    ...FONTS.body4,
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "-3rem",
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
  title: {
    ...FONTS.body3,
    color: COLORS.black,
    marginBottom: "10rem",
  },
  pastDrawsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20rem",
  },
});

export default PastDrawsCard;
