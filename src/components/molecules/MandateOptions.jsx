import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
import { useGetMandateOptionsQuery } from "../../store/apiSlices/mandateApi";
import ListItem from "../atoms/ListItem";
import CmsLoading from "../cms/CmsLoading";

const MandateOptions = ({ ProceedButton, disabled, authType }) => {
  const isFocused = useIsFocused();
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const [mandateButtons, setMandateButtons] = useState([]);
  const {
    isLoading: getMandateOptionsLoading,
    error: getMandateOptionsError,
    data: getMandateOptionsData,
  } = useGetMandateOptionsQuery(unipeEmployeeId, {
    pollingInterval: isFocused ? 1000 * 10 : undefined,
  });

  const mandateOptionsHandler = {
    upi: (emandateOptions, mandateOptions) => {
      if (emandateOptions?.[3] === "1") {
        mandateOptions.push({
          title: "UPI",
          subtitle: "Instant registration",
          subtitleStyle: { color: COLORS.secondary },
          iconName: "card-account-details-outline",
          subItems: [
            {
              title: "Google Pay",
              image: require("../../assets/payment_icons/gpay.png"),
              onPress: () => {
                trackEvent({
                  interaction: InteractionTypes.SCREEN_OPEN,
                  screen: "mandateStart",
                  action: "CONTINUE",
                  properties: {
                    method: "upi",
                    provider: "gpay",
                  },
                });
                ProceedButton({
                  authType: "upi",
                  provider: "cashfree",
                  app: "GPAY",
                });
              },
            },
            {
              title: "AmazonPay",
              image: require("../../assets/payment_icons/amazon.png"),
              onPress: () => {
                trackEvent({
                  interaction: InteractionTypes.SCREEN_OPEN,
                  screen: "mandateStart",
                  action: "CONTINUE",
                  properties: {
                    method: "upi",
                    provider: "amazonpay",
                  },
                });
                ProceedButton({
                  authType: "upi",
                  provider: "cashfree",
                  app: "AMAZONPAY",
                });
              },
            },
            {
              title: "Paytm",
              image: require("../../assets/payment_icons/paytm.png"),
              onPress: () => {
                trackEvent({
                  interaction: InteractionTypes.SCREEN_OPEN,
                  screen: "mandateStart",
                  action: "CONTINUE",
                });
                ProceedButton({
                  authType: "upi",
                  provider: "cashfree",
                  app: "PAYTM",
                  properties: {
                    method: "upi",
                    provider: "paytm",
                  },
                });
              },
            },
            {
              title: "PhonePe",
              image: require("../../assets/payment_icons/Phonepe.png"),
              onPress: () => {
                trackEvent({
                  interaction: InteractionTypes.SCREEN_OPEN,
                  screen: "mandateStart",
                  action: "CONTINUE",
                  properties: {
                    method: "upi",
                    provider: "phonepe",
                  },
                });
                ProceedButton({
                  authType: "upi",
                  provider: "cashfree",
                  app: "PHONEPE",
                });
              },
            },
            {
              title: "BHIM",
              image: require("../../assets/payment_icons/Bhim.png"),
              onPress: () => {
                trackEvent({
                  interaction: InteractionTypes.SCREEN_OPEN,
                  screen: "mandateStart",
                  action: "CONTINUE",
                  properties: {
                    method: "upi",
                    provider: "bhim",
                  },
                });
                ProceedButton({
                  authType: "upi",
                  provider: "cashfree",
                  app: "BHIM",
                });
              },
            },
          ],
          type: "upi",
          onPress: () => {},
        });
      }
    },
    debitcard: (emandateOptions, mandateOptions) => {
      if (emandateOptions[1] === "1") {
        mandateOptions.push({
          title: "Debit Card",
          subtitleStyle: { color: COLORS.primary },
          iconName: "credit-card-outline",
          type: "debitcard",
          onPress: () => {
            trackEvent({
              interaction: InteractionTypes.SCREEN_OPEN,
              screen: "mandateStart",
              action: "CONTINUE",
            });
            ProceedButton({ authType: "debitcard" });
          },
        });
      }
    },
    netbanking: (emandateOptions, mandateOptions) => {
      if (emandateOptions[0] === "1") {
        mandateOptions.push({
          title: "Net Banking",
          subtitleStyle: { color: COLORS.primary },
          iconName: "bank-outline",
          type: "netbanking",
          onPress: () => {
            trackEvent({
              interaction: InteractionTypes.SCREEN_OPEN,
              screen: "mandateStart",
              action: "CONTINUE",
            });
            ProceedButton({ authType: "netbanking" });
          },
        });
      }
    },
    aadhaar: (emandateOptions, mandateOptions) => {
      if (emandateOptions[2] === "1") {
        mandateOptions.push({
          title: "Aadhaar",
          subtitle: "Takes upto 96 banking hours to register",
          subtitleStyle: { color: COLORS.secondary },
          iconName: "card-account-details-outline",
          type: "aadhaar",
          onPress: () => {
            trackEvent({
              interaction: InteractionTypes.SCREEN_OPEN,
              screen: "mandateStart",
              action: "CONTINUE",
            });
            ProceedButton({ authType: "aadhaar" });
          },
        });
      }
    },
  };
  useEffect(() => {
    if (!getMandateOptionsLoading) {
      let mandateOptions = [];
      let emandateOptions = "0000";
      let mandateOrdering = [];
      console.log("getMandateOptionsData", getMandateOptionsData);
      if (!getMandateOptionsError && getMandateOptionsData?.body?.methods) {
        emandateOptions = getMandateOptionsData?.body?.methods;
        mandateOrdering = getMandateOptionsData?.body?.ordering || [
          "upi",
          "debitcard",
          "netbanking",
          "aadhaar",
        ];
      }
      mandateOrdering.forEach((method) => {
        mandateOptionsHandler[method](emandateOptions, mandateOptions);
      });
      if (mandateOptions.length > 1) {
        mandateOptions[0].subtitle = "Recommended";
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

  return (
    <View style={styles.container}>
      {getMandateOptionsLoading ? (
        <CmsLoading />
      ) : (
        mandateButtons.map((item, index) => (
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
        ))
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: { padding: 2 },
  notFoundContainer: {
    padding: "10rem",
  },
});

export default MandateOptions;
