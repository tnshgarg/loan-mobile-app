import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import bankCodeEmandateOptionsMap from "../../assets/bankCodeEmandateOptionsMap";

const MandateOptions = ({ ProceedButton, disabled, authType }) => {
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);

  const [mandateButtons, setMandateButtons] = useState([]);

  useEffect(() => {
    var mandateOptions = [];
    var bankCode = ifsc.substring(0, 4);
    var emandateOptions = bankCodeEmandateOptionsMap[bankCode] || "000";
    if (emandateOptions[1] === "1") {
      mandateOptions.push({
        title: "Debit Card",
        iconName: "credit-card-outline",
        type: "debitcard",
        onPress: () => {
          ProceedButton({ authType: "debitcard" });
        },
      });
    }
    if (emandateOptions[0] === "1") {
      mandateOptions.push({
        title: "Net Banking",
        iconName: "bank-outline",
        type: "netbanking",
        onPress: () => {
          ProceedButton({ authType: "netbanking" });
        },
      });
    }

    if (emandateOptions[2] === "1") {
      if (mandateOptions.length === 0) {
        mandateOptions.push({
          title: "Aadhaar",
          subtitle: "Takes upto 48 banking hours to register",
          iconName: "card-account-details-outline",
          type: "aadhaar",
          onPress: () => {
            ProceedButton({ authType: "aadhaar" });
          },
        });
      }
    }
    if (!mandateOptions[0]?.subtitle) {
      mandateOptions[0].subtitle = "Recommended";
    }
    console.log("mandateOptions: ", mandateOptions);
    if (mandateOptions.length > 0) {
      setMandateButtons(mandateOptions);
    } else {
      setMandateButtons([
        {
          title: "Your bank does not support mandate",
          iconName: "crosshairs-off",
          onPress: () => {},
        },
      ]);
    }
  }, [ifsc]);

  return (
    <View style={styles.container}>
      {mandateButtons.map((item, index) => {
        return (
          <ListItem
            titleStyle={{ ...FONTS.body4 }}
            subtitleStyle={
              index == 0 && { color: COLORS.primary, ...FONTS.body5 }
            }
            key={index}
            item={item}
            disabled={disabled}
            showIcon={true}
            selected={authType == item.type}
          />
        );
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    borderWidth: 2,
    // borderRadius: 5,
    borderColor: COLORS.lightgray_01,
    elevation: 2,
    backgroundColor: COLORS.white,
    margin: 1,
  },
  notFoundContainer: {
    padding: "10rem",
  },
});

export default MandateOptions;
