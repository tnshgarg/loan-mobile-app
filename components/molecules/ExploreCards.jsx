import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Earn from "../../assets/Earn.svg";
import ODS from "../../assets/GetODS.svg";
import Refer from "../../assets/Refer.svg";
import { COLORS, FONTS } from "../../constants/Theme";

const Card = ({ destination, component, active }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate(destination);
      }}
      disabled={!active}
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
    destination: "Invest",
    component: <Earn width={150} height={200} />,
  },
  {
    component: <Refer width={150} height={200} />,
    active: false,
  },
];

const ExploreCards = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <ScrollView horizontal={true} style={styles.cardsView}>
        {data.map((item, index) => (
          <Card
            key={index}
            destination={item.destination}
            component={item.component}
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
