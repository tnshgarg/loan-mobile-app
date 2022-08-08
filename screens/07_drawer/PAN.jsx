import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const PAN = () => {
  const fullName = useSelector((state) => state.pan.accountNumber);
  const panNumber = useSelector((state) => state.pan.ifsc);
  const DOB = useSelector((state) => state.pan.upi);
  const address = useSelector((state) => state.pan.accountHolderName);
  const verifyStatus = useSelector((state) => state.pan.verifyStatus);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem
        label="Full Name"
        title={fullName || "Not Provided"}
        divider
      />
      <DetailItem
        label="PAN Number"
        title={panNumber || "Not Provided"}
        divider
      />
      <DetailItem label="DOB" title={DOB || "Not Provided"} divider />
      <DetailItem label="Address" title={address || "Not Provided"} divider />
      <DetailItem
        label="Verify Status"
        title={verifyStatus || "Not Provided"}
      />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Update"
          onPress={() =>
            Alert.alert(
              "The PAN Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default PAN;
