import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";

const PAN = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Full Name" title="Tanish Garg" divider />
      <DetailItem label="PAN Number" title="ASPPN2004L" divider />
      <DetailItem label="DOB" title="07/07/2000" divider />
      <DetailItem
        label="Address"
        title="Vasant Vihar, Kaithal, Haryana, 136027"
        divider
      />
      <DetailItem label="Verify Status" title="Pending" />
      <View style={{ flex: 1, alignItems: "flex-end", paddingBottom: 20 }}>
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Home Screen"
          onPress={() =>
            Alert.alert(
              "The PAN Details are not editable, please ask your employer to update these details for you."
            )
          }
        />
      </View>
    </View>
  );
};

export default PAN;
