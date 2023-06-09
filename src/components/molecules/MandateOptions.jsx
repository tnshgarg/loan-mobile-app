import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import bankCodeEmandateOptionsMap from "../../assets/bankCodeEmandateOptionsMap";
import Aadhaar from "../../assets/Aadhaar.svg";
import DebitCard from "../../assets/DebitCard.svg";
import Bank from "../../assets/Bank.svg";

const MandateOptions = ({ ProceedButton, disabled, authType, bankData }) => {
  const [mandateButtons, setMandateButtons] = useState([]);
  const ifsc = bankData?.ifsc;

  useEffect(() => {
    let mandateOptions = [];
    let bankCode = ifsc?.substring(0, 4);
    let emandateOptions = bankCodeEmandateOptionsMap[bankCode] || "000";

    if (emandateOptions[2] === "1") {
      mandateOptions.push({
        title: "Aadhaar",
        subtitle: "Takes upto 96 banking hours to register",

        imageUri: <Aadhaar />,
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

        imageUri: <Bank />,
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

        imageUri: <DebitCard />,
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
  }, [ifsc]);

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
