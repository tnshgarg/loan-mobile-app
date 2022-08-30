import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";
import BankInformationCollection from "../../templates/Bank/BankInformationCollection";

const Bank = () => {
  const accountNumber = useSelector((state) => state.bank.accountNumber);
  const ifsc = useSelector((state) => state.bank.ifsc);
  const upi = useSelector((state) => state.bank.upi);
  const accountHolderName = useSelector(
    (state) => state.bank.accountHolderName
  );
  const verifyStatus = useSelector((state) => state.bank.verifyStatus);

  const data = [
    { label: "Account Number", value: accountNumber },
    { label: "Account Holder Name", value: accountHolderName },
    { label: "IFSC Code", value: ifsc },
    { label: "UPI Id", value: upi },
    { label: "Verify Status", value: verifyStatus },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus == "SUCCESS" ? (
        <>
          {data.map((item, index) => (
            <DetailItem
              key={index}
              label={item.label}
              value={item.value || "Not Provided"}
              divider
            />
          ))}
          <View
            style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}
          >
            <PrimaryButton
              style={{ marginTop: 20 }}
              title="Update"
              onPress={() =>
                Alert.alert(
                  "The Bank Details are not editable, please ask your employer to update"
                )
              }
            />
          </View>
        </>
      ) : (
        <BankInformationCollection />
      )}
    </View>
  );
};

export default Bank;
