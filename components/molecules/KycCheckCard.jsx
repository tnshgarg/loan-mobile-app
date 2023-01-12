import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import { Ionicons } from "react-native-vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

const KycCheckCard = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
      {props.message.map((item, index) =>
        item != null ? (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("AccountStack", {
                screen: "KYC",
                params: { screen: item.value },
              })
            }
            style={styles.card}
          >
            <Ionicons
              name="add-circle-outline"
              color={COLORS.primary}
              size={24}
            />
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ) : null
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: "10rem",
    flexDirection: "column",
  },
  title: {
    ...FONTS.body4,
    textAlign: "center",
    color: COLORS.gray,
  },
  subtitle: {
    ...FONTS.body2,
    textAlign: "center",
    marginBottom: "10rem",
  },
  card: {
    borderRadius: 5,
    width: "100%",
    marginTop: "10rem",
    //elevation: 1,
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "10rem",
  },
  cardText: { ...FONTS.h4, color: COLORS.black, flex: 1, paddingLeft: "10rem" },
});

export default KycCheckCard;
