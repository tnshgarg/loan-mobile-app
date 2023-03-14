import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import { useSelector } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

const CompleteKycCard = () => {
  const navigation = useNavigation();

  const [show, setShow] = useState(true);

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
        },
      });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
        },
      });
    }
  };

  useEffect(() => {
    if (
      profileComplete &&
      aadhaarVerifyStatus == "SUCCESS" &&
      panVerifyStatus == "SUCCESS" &&
      bankVerifyStatus == "SUCCESS"
    ) {
      setShow(false);
    }
  }, [profileComplete, aadhaarVerifyStatus, panVerifyStatus, bankVerifyStatus]);

  return (
    <>
      {show ? (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={() => handleConditionalNav()}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Complete eKYC</Text>
            <Text style={styles.subtitle}>
              Verify your personal details {"\n"}to get on-demand salary
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Start now</Text>
            <Ionicons name="arrow-forward" color={COLORS.darkGray} size={18} />
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: "10rem",
    paddingVertical: "20rem",
    paddingHorizontal: "15rem",
    backgroundColor: COLORS.moneyCardBg,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...FONTS.h2,
    textAlign: "left",
    color: COLORS.primary,
  },
  subtitle: {
    ...FONTS.body4,
    textAlign: "left",
    marginTop: "4rem",
    color: COLORS.white,
  },
  card: {
    borderRadius: "5rem",
    // borderWidth: 1.5,
    // borderColor: COLORS.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10rem",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  cardText: {
    ...FONTS.h5,
    color: COLORS.darkGray,
    marginRight: "10rem",
  },
});

export default CompleteKycCard;
