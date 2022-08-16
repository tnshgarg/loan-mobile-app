import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";

const Aadhaar = () => {
  const aadhaarNumber = useSelector((state) => state.aadhaar.number);
  const aadhaarData = useSelector((state) => state.aadhaar.data["aadhaar_data"]);
  const DOB = aadhaarData?.["date_of_birth"];
  const fullName = aadhaarData?.["name"];
  const address = aadhaarData?.["locality"];
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);
  //Todo: Full Name, DOB and Address not present

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem
        label="Full Name"
        value={fullName || "Not Provided"}
        divider
      />
      <DetailItem
        label="Aadhaar Number"
        value={aadhaarNumber || "Not Provided"}
        divider
      />
      <DetailItem label="Date of Birth" value={DOB || "Not Provided"} divider />
      <DetailItem label="Address" value={address || "Not Provided"} divider />
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
              "The Aadhaar Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default Aadhaar;
