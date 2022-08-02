import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const Aadhaar = () => {
  const aadhaarNumber = useSelector((state) => state.aadhaar.number);
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Full Name" title="Tanish Garg" divider />
      <DetailItem
        label="Aadhaar Number"
        title={JSON.stringify("aadhaarNumber")}
        divider
      />
      <DetailItem label="DOB" title="07/07/2000" divider />
      <DetailItem
        label="Address"
        title="Vasant Vihar, Kaithal, Haryana, 136027"
        divider
      />
      <DetailItem label="Verify Status" title={"verifyStatus"} />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Update"
          onPress={() =>
            Alert.alert(
              "The Aadhaar Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default Aadhaar;
