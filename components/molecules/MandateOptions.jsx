import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import { useSelector } from "react-redux";
import emandateList from "../../assets/emandateList";

const MandateOptions = ({ ProceedButton, disabled }) => {
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);

  var mandateOptions = [];

  const getMandateOptions = () => {
    var copyIfscCode = ifsc;
    const bankCodes = Object.keys(emandateList);
    const mandateOption = Object.values(emandateList);
    const ifscCode = copyIfscCode.replace(/[^a-z]/gi, "");
    for (var i in bankCodes) {
      if (bankCodes[i] == ifscCode) {
        console.log("mandateOTpPPP: ", mandateOption[i]);
        const netBanking = parseInt(mandateOption[i].substring(0, 1));
        const debitCard = parseInt(mandateOption[i].substring(1, 2));
        const aadhaar = parseInt(mandateOption[i].substring(2, 3));
        if (netBanking === 1) {
          mandateOptions.push({
            title: "Net Banking",
            iconName: "bank-outline",
            onPress: () => ProceedButton({ authType: "netbanking" }),
          });
        }
        if (debitCard === 1) {
          mandateOptions.push({
            title: "Debit Card",
            iconName: "credit-card-outline",
            onPress: () => ProceedButton({ authType: "debitcard" }),
          });
        }
        if (aadhaar === 1) {
          mandateOptions.push({
            title: "Aadhaar",
            iconName: "credit-card-outline",
            onPress: () => ProceedButton({ authType: "aadhaar" }),
          });
        }
      }
    }
    if (mandateOptions.length == 0) {
      return [
        {
          title: "NotFound",
        },
      ];
    }
    return mandateOptions;
  };

  return (
    <View style={styles.container}>
      {getMandateOptions().map((item, index) => {
        console.log("item:", item);
        return <ListItem key={index} item={item} disabled={disabled} />;
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
});

export default MandateOptions;
