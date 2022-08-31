import { View, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const Aadhaar = () => {
  const number = useSelector((state) => state.aadhaar.number);
  const data = useSelector((state) => state.aadhaar.data);
  const address = data?.["address"];
  const dob = data?.["date_of_birth"];
  const name = data?.["name"];
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);
  //Todo: Full Name, dob and Address not present

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Number" value={number || "Not Provided"} divider />
      <DetailItem label="Name" value={name || "Not Provided"} divider />
      <DetailItem label="Date of Birth" value={dob || "Not Provided"} divider />
      <DetailItem label="Address" value={address || "Not Provided"} divider />
      <DetailItem label="Verify Status" value={verifyStatus || "Not Provided"} />
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
