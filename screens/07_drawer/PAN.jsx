import { View, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const PAN = () => {
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const dob = data?.["date_of_birth"];
  const email = data?.["email"];
  const gender = data?.["gender"];
  const name = data?.["name"];

  const verifyStatus = useSelector((state) => state.pan.verifyStatus); 

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Number" value={number || "Not Provided"} divider />
      <DetailItem label="Name" value={name || "Not Provided"} divider />
      <DetailItem label="Date of Birth" value={dob || "Not Provided"} divider />
      <DetailItem label="Gender" value={gender || "Not Provided"} divider />
      <DetailItem label="Email" value={email || "Not Provided"} divider />
      <DetailItem label="Verify Status" value={verifyStatus || "Not Provided"}/>

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
