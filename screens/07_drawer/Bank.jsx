import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const Bank = () => {
  const accountNumber = useSelector((state) => state.bank.accountNumber);
  const ifsc = useSelector((state) => state.bank.ifsc);
  const upi = useSelector((state) => state.bank.upi);
  const accountHolderName = useSelector(
    (state) => state.bank.accountHolderName
  );
  const verifyStatus = useSelector((state) => state.bank.verifyStatus);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem
        label="Account Number"
        value={accountNumber || "Not Provided"}
        divider
      />
      <DetailItem label="IFSC Code" value={ifsc || "Not Provided"} divider />
      <DetailItem
        label="Account Holder Name"
        value={accountHolderName || "Not Provided"}
        divider
      />
      <DetailItem label="UPI Id" value={upi || "Not Provided"} divider />
      <DetailItem
        label="Verify Status"
        value={verifyStatus || "Not Provided"}
      />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
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
    </View>
  );
};

export default Bank;
