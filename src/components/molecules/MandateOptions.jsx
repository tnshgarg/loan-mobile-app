import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import { useGetMandateOptionsQuery } from "../../store/apiSlices/mandateApi";
import { useIsFocused } from "@react-navigation/native";

const MandateOptions = ({ ProceedButton, disabled, authType }) => {
  const isFocused = useIsFocused();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const [mandateButtons, setMandateButtons] = useState([]);
  const {
    isLoading: getMandateOptionsLoading,
    error: getMandateOptionsError,
    data: getMandateOptionsData,
  } = useGetMandateOptionsQuery(unipeEmployeeId, {
    pollingInterval: isFocused ? 1000 * 2 : undefined,
  });

  useEffect(() => {
    if (!getMandateOptionsLoading) {
      let mandateOptions = [];
      let emandateOptions = "000";
      console.log("getMandateOptionsData", getMandateOptionsData);
      if (!getMandateOptionsError && getMandateOptionsData?.body?.methods) {
        emandateOptions = getMandateOptionsData?.body?.methods;
      }
      mandateOptions.push({
        title: "UPI",
        subtitle: "Instant registration",
        subtitleStyle: { color: COLORS.secondary },
        iconName: "card-account-details-outline",
        subItems: [
          {
            title: "Google Pay",
            image: require("../../assets/gpay.png"),
            onPress: () => {
              ProceedButton({
                authType: "upi",
                provider: "cashfree",
                app: "GPAY",
              });
            },
          },
          {
            title: "AmazonPay",
            image: require("../../assets/amazon_pay.png"),
            onPress: () => {
              ProceedButton({
                authType: "upi",
                provider: "cashfree",
                app: "AMAZONPAY",
              });
            },
          },
          {
            title: "Paytm",
            image: require("../../assets/paytm.png"),
            onPress: () => {
              ProceedButton({
                authType: "upi",
                provider: "cashfree",
                app: "PAYTM",
              });
            },
          },
        ],
        type: "upi",
        onPress: () => {
          ProceedButton({ authType: "upi", provider: "cashfree" });
        },
      });
      if (emandateOptions[2] === "1") {
        mandateOptions.push({
          title: "Aadhaar",
          subtitle: "Takes upto 96 banking hours to register",
          subtitleStyle: { color: COLORS.secondary },
          iconName: "card-account-details-outline",
          type: "aadhaar",
          onPress: () => {
            ProceedButton({ authType: "aadhaar" });
          },
        });
      }

      if (emandateOptions[0] === "1") {
        mandateOptions.push({
          title: "Net Banking",
          subtitleStyle: { color: COLORS.primary },
          iconName: "bank-outline",
          type: "netbanking",
          onPress: () => {
            ProceedButton({ authType: "netbanking" });
          },
        });
      }

      if (emandateOptions[1] === "1") {
        mandateOptions.push({
          title: "Debit Card",
          subtitleStyle: { color: COLORS.primary },
          iconName: "credit-card-outline",
          type: "debitcard",
          onPress: () => {
            ProceedButton({ authType: "debitcard" });
          },
        });
      }

      if (mandateOptions.length > 1) {
        mandateOptions[mandateOptions.length - 1].subtitle = "Recommended";
      }

      if (mandateOptions.length > 0) {
        setMandateButtons(mandateOptions);
      } else {
        setMandateButtons([
          {
            title: "Your bank does not support mandate",
            iconName: "crosshairs-off",
            type: "NA",
            disabled: true,
            onPress: () => {},
          },
        ]);
      }
    }
  }, [unipeEmployeeId, getMandateOptionsLoading]);

  return mandateButtons.map((item, index) => {
    return (
      <View style={styles.container}>
        <ListItem
          titleStyle={{ ...FONTS.body4 }}
          subtitleStyle={{ ...FONTS.body5, ...item.subtitleStyle }}
          key={index}
          item={item}
          disabled={disabled || item.disabled}
          showIcon={!item.disabled}
          selected={authType == item.type}
          containerStyle={{
            marginVertical: 5,
            ...SIZES.shadow,
            width: "99%",
            alignSelf: "center",
            padding: 15,
          }}
        />
      </View>
    );
  });
};

const styles = EStyleSheet.create({
  container: { padding: 2 },
  notFoundContainer: {
    padding: "10rem",
  },
});

export default MandateOptions;
