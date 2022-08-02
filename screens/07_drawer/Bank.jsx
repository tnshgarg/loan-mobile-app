import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";

const Bank = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Account Number" title="14007754412366547" divider />
      <DetailItem label="PAN Number" title="UTIB0000403" divider />
      <DetailItem label="Account Holder Name" title="Kamal Goyal" divider />
      <DetailItem label="UPI Id" title="9876543210@upi" divider />
      <DetailItem label="Verify Status" title="Pending" />
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
