import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
<<<<<<< HEAD
=======
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import {
  InteractionTypes,
  trackEvent,
} from "../../helpers/analytics/commonAnalytics";
>>>>>>> b8830c427b998ecae2509e710ec8da56d4ee96a1
import { useGetMandateOptionsQuery } from "../../store/apiSlices/mandateApi";
import CmsLoading from "../cms/CmsLoading";
import { Aadhaar, DebitCard, NA, NetBanking, Upi } from "./MandateItems";

const MandateOptions = ({ ProceedButton, disabled, authType }) => {
  console.log("MandateOptions", ProceedButton, disabled, authType);
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

<<<<<<< HEAD
  let AllMandateOptions = {
    DebitCard: (
      <DebitCard
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    NetBanking: (
      <NetBanking
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    Aadhaar: (
      <Aadhaar
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    UPI: (
      <Upi
        ProceedButton={ProceedButton}
        disabled={disabled}
        authType={authType}
      />
    ),
    NA: <NA />,
  };

  useEffect(() => {
    if (!getMandateOptionsLoading) {
      let mandateOptions = [];
      const usermandateoptions = [];
      console.log("getMandateOptionsData", getMandateOptionsData);
      if (!getMandateOptionsError && getMandateOptionsData?.body?.methods) {
        mandateOptions = getMandateOptionsData?.body?.methods;
      }
      mandateOptions.map((item) => {
        usermandateoptions.push(AllMandateOptions[item]);
      });

      if (usermandateoptions.length > 1) {
        usermandateoptions[0].subtitle = "Recommended";
=======
  const mandateOptionsHandler = {
    upi: (emandateOptions, mandateOptions) => {
      if (emandateOptions?.[3] == "0") return;
      mandateOptions.push({
        title: "UPI",
        subtitle: `${strings.instantRegistration}`,
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
      let emandateOptions = "000";
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
>>>>>>> b8830c427b998ecae2509e710ec8da56d4ee96a1
      }

      if (usermandateoptions.length > 0) {
        setMandateButtons(usermandateoptions);
      } else {
        setMandateButtons([AllMandateOptions["NA"]]);
      }
      console.log("mandateButtons", mandateButtons, usermandateoptions);
    }
  }, [unipeEmployeeId, getMandateOptionsLoading]);

  return (
    <View style={styles.ParentContainer}>
      {getMandateOptionsLoading ? (
        <CmsLoading />
      ) : (
        <>
          {mandateButtons.map((item, index) => {
            return <View key={index}>{item}</View>;
          })}
        </>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  ParentContainer: { padding: 2 },
});
export default MandateOptions;
