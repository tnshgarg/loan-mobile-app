import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import bankData from "../../assets/emandateBankList";
import { useSelector } from "react-redux";

const MandateOptions = ({ ProceedButton, disabled }) => {
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);
  // const [dataUpdated, setDataUpdated] = useState(false);
  // const mandateOptions = [
  //   {
  //     title: "Debit Card",
  //     iconName: "credit-card-outline",
  //     onPress: () => ProceedButton({ authType: "debitcard" }),
  //   },
  //   {
  //     title: "Net Banking",
  //     iconName: "bank-outline",
  //     onPress: () => ProceedButton({ authType: "netbanking" }),
  //   },
  // ];

  var mandateOptions = [];

  const getMandateOptions = () => {
    var duplicateIfscCode = ifsc;
    const ifscCode = duplicateIfscCode.replace(/[^a-z]/gi, "");
    console.log("ifscCodeMod:", ifscCode);
    bankData.map(({ bankName, bankCode, netBanking, debitCard, aadhaar }) => {
      if (bankCode == ifscCode) {
        if (netBanking === 1) {
          mandateOptions.push({
            title: "Net Banking",
            iconName: "bank-outline",
            onPress: () => ProceedButton({ authType: "netbanking" }),
          });
          console.log("netbankingtrue");
        }
        if (debitCard === 1) {
          mandateOptions.push({
            title: "Debit Card",
            iconName: "credit-card-outline",
            onPress: () => ProceedButton({ authType: "debitcard" }),
          });
          console.log("debitcardtrue");
        }
      }
    });
    // setDataUpdated(true);
    console.log(mandateOptions);
    // mandateOptions.map((item, index) => );
    return mandateOptions;
  };

  // console.log("dataupdated:", dataUpdated);

  // useEffect(() => {
  //   getMandateOptions();
  // }, []);

  return (
    <View style={styles.container}>
      {/* {mandateOptions.map((item, index) => {
        console.log("fnjdsn item: ", item);
        return <ListItem key={index} item={item} disabled={disabled} />;
      })} */}
      {getMandateOptions().map((item, index) => {
        console.log("fnjdsn item: ", item);
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
