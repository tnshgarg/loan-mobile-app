import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const PAN = () => {
  const fullName = useSelector((state) => state.pan.name);
  const panNumber = useSelector((state) => state.pan.number);
  const DOB = useSelector((state) => state.pan.dob);
  const gender = useSelector((state) => state.pan.gender);
  const email = useSelector((state) => state.pan.email);
  const verifyStatus = useSelector((state) => state.pan.verifyStatus); 

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem
        label="Full Name"
        value={fullName || "Not Provided"}
        divider
      />
      <DetailItem
        label="PAN Number"
        value={panNumber || "Not Provided"}
        divider
      />
      <DetailItem label="Date of Birth" value={DOB || "Not Provided"} divider />
      <DetailItem label="Gender" value={gender || "Not Provided"} divider />
      <DetailItem label="E-Mail" value={email || "Not Provided"} divider />
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
              "The PAN Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default PAN;
