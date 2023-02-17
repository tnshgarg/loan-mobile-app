import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import { useSelector } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import { Ionicons } from "react-native-vector-icons";
import { useEffect, useState } from "react";

const CompleteKycCard = () => {
  const navigation = useNavigation();

  const [show, setShow] = useState(true);

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const aadhaarTxnId = useSelector((state) => state.aadhaar.submitOTPtxnId);
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (aadhaarTxnId) {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
          params: {
            screen: "Verify",
          },
        },
      });
    } else if (aadhaarVerifyStatus === "INPROGRESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
          params: {
            screen: "Confirm",
          },
        },
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
          params: {
            screen: "Form",
          },
        },
      });
    } else if (panVerifyStatus === "INPROGRESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
          params: {
            screen: "Confirm",
          },
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
          params: {
            screen: "Form",
          },
        },
      });
    }  else if (bankVerifyStatus === "INPROGRESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
          params: {
            screen: "Confirm",
          },
        },
      });
    }
    else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
          params: {
            screen: "Form",
          },
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
          <View>
            <Text style={styles.title}>Complete eKYC</Text>
            <Text style={styles.subtitle}>
              Verify your personal details {"\n"}to get on-demand salary
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Start now</Text>
            <Ionicons name="arrow-forward" color={COLORS.darkGray} size={20} />
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
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...FONTS.h2,
    textAlign: "left",
    marginHorizontal: "10rem",
    color: COLORS.primary,
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
    width: "120rem",
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
