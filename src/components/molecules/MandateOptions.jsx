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
  const [vpa, setVpa] = useState("");
  const [mandateButtons, setMandateButtons] = useState([]);
  const {
    isLoading: getMandateOptionsLoading,
    error: getMandateOptionsError,
    data: getMandateOptionsData,
  } = useGetMandateOptionsQuery(unipeEmployeeId, {
    pollingInterval: isFocused ? 1000 * 10 : undefined,
  });

  let upiReg = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}/gm;
  let isValidVpa = false;
  if (upiReg.test(vpa || "")) {
    isValidVpa = true;
  }
  let AllMandateOptions = {
    UPI: {
      title: "UPI",
      subtitle: "Instant registration",
      subtitleStyle: { color: COLORS.primary },
      iconName: "card-account-details-outline",
      type: "upi",
      textInput: {
        placeholder: "Enter UPI ID",
        value: {vpa},
        setValue: setVpa,
        valid: isValidVpa,
        invalidMsg : "Please enter a valid UPI ID",
        onPress: () => {
          trackEvent({
            interaction: InteractionTypes.SCREEN_OPEN,
            screen: "mandateStart",
            action: "CONTINUE",
          });
          ProceedButton({ authType: "upi", provider: "cashfree" });
        },
      },
    },
    DebitCard: {
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
    },
    NetBanking: {
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
    },
    Aadhaar: {
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
    },
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
      }

      if (usermandateoptions.length > 0) {
        setMandateButtons(usermandateoptions);
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
      console.log("mandateButtons", mandateButtons, usermandateoptions);
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
            subtitleStyle={{ ...FONTS.body5, ...item?.subtitleStyle }}
            key={index}
            item={item}
            disabled={disabled || item?.disabled}
            showIcon={!item?.disabled}
            selected={authType == item?.type}
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
