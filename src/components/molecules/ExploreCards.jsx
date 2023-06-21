import { useNavigation } from "@react-navigation/core";
import { useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import ODS from "../../assets/GetODS.svg";
import Refer from "../../assets/Refer.svg";
import { COLORS, FONTS } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import Analytics, {
  InteractionTypes,
} from "../../helpers/analytics/commonAnalytics";

const Card = ({ destination, component, inactive }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={inactive}
      onPress={() => {
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "ExploreCards",
          action: `navigate:${destination}`,
          status: "",
        });
        navigation.navigate(destination);
      }}
    >
      {component}
    </TouchableOpacity>
  );
};
const data = [
  {
    destination: "Money",
    component: <ODS width={150} height={200} />,
  },
  {
    component: <Refer width={150} height={200} />,
    inactive: true,
  },
];

const ExploreCards = () => {
  const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>{strings.explore}</Text>
        <View style={{ justifyContent: "flex-end" }}>
          <Ionicons
            name="arrow-forward"
            color={COLORS.darkGray}
            size={20}
            onPress={() => scrollRef.current.scrollToEnd({ animated: true })}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        disableIntervalMomentum={true}
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        style={styles.cardsView}
        ref={scrollRef}
      >
        {data.map((item, index) => (
          <Card
            key={index}
            destination={item.destination}
            component={item.component}
            inactive={item.inactive}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: "10rem",
    paddingVertical: "20rem",
    flexDirection: "column",
  },
  title: {
    ...FONTS.h3,
    textAlign: "left",
    marginHorizontal: "10rem",
    color: COLORS.black,
  },
  cardsView: {
    marginTop: "10rem",
  },
});

export default ExploreCards;
