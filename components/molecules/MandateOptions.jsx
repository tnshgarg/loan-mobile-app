import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import bankCodeEmandateOptionsMap from "../../assets/bankCodeEmandateOptionsMap";

const MandateOptions = ({ ProceedButton, disabled, selected }) => {
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);
  const [type, setType] = useState("");

  const [mandateButtons, setMandateButtons] = useState([]);

  useEffect(() => {
    var mandateOptions = [];
    var bankCode = ifsc.substring(0, 4);
    var emandateOptions = bankCodeEmandateOptionsMap[bankCode] || "000";
    if (emandateOptions[0] === "1") {
      mandateOptions.push({
        title: "Net Banking",
        iconName: "bank-outline",
        onPress: () => {
          setType("Net Banking");
          ProceedButton({ authType: "netbanking" });
        },
      });
    }
    if (emandateOptions[1] === "1") {
      mandateOptions.push({
        title: "Debit Card",
        iconName: "credit-card-outline",
        onPress: () => {
          setType("Debit Card");
          ProceedButton({ authType: "debitcard" });
        },
      });
    }
    if (emandateOptions[2] === "1") {
      mandateOptions.push({
        title: "Aadhaar",
        iconName: "credit-card-outline",
        onPress: () => {
          setType("Aadhaar");
          ProceedButton({ authType: "aadhaar" });
        },
      });
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
            key={index}
            item={item}
            disabled={disabled}
            showIcon={true}
            selected={type == item.title}
          />
        );
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
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
