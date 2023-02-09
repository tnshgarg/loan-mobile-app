import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import { useSelector } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import { Ionicons } from "react-native-vector-icons";

const CompleteKycCard = () => {
  const navigation = useNavigation();
  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarComplete = useSelector((state) => state.aadhaar.verifyStatus);
  const panComplete = useSelector((state) => state.pan.verifyStatus);
  const bankComplete = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else {
      if (aadhaarComplete != "SUCCESS") {
        navigation.navigate("AccountStack", {
          screen: "KYC",
          params: {
            screen: "AADHAAR",
          },
        });
      } else {
        if (panComplete != "SUCCESS") {
          navigation.navigate("AccountStack", {
            screen: "KYC",
            params: {
              screen: "PAN",
            },
          });
        } else {
          if (bankComplete != "SUCCESS") {
            navigation.navigate("AccountStack", {
              screen: "KYC",
              params: {
                screen: "BANK",
              },
            });
          }
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Complete eKYC</Text>
        <Text style={styles.subtitle}>
          Verify your personal details {"\n"}to get on-demand salary
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleConditionalNav()}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Start now</Text>
          <Ionicons name="arrow-forward" color={COLORS.darkGray} size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: "10rem",
    paddingVertical: "20rem",
    flexDirection: "column",
    backgroundColor: COLORS.darkGray,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...FONTS.h2,
    textAlign: "left",
    marginHorizontal: "10rem",
    color: COLORS.yellow,
  },
  subtitle: {
    ...FONTS.body4,
    textAlign: "left",
    marginTop: "4rem",
    marginHorizontal: "10rem",
    color: COLORS.white,
  },
  card: {
    borderRadius: 10,
    width: "100%",
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
    flexDirection: "row",
    padding: "8rem",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  cardText: {
    ...FONTS.h5,
    color: COLORS.darkGray,
    paddingHorizontal: "10rem",
  },
});

export default CompleteKycCard;
