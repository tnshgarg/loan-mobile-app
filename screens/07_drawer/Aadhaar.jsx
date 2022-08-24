import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";
import AadhaarDataCollection from "../../templates/Aadhaar/AadhaarDataCollection";

const Aadhaar = () => {
  const aadhaarNumber = useSelector((state) => state.aadhaar.number);
  const aadhaarData = useSelector(
    (state) => state.aadhaar.data["aadhaar_data"]
  );
  const dob = aadhaarData?.["date_of_birth"];
  const fullName = aadhaarData?.["name"];
  const address = aadhaarData?.["locality"];
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const data = [
    { label: "Full Name", value: fullName },
    { label: "Date of Birth", value: dob },
    { label: "Aadhaar Number", value: aadhaarNumber },
    { label: "Address", value: address },
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
                  "The Aadhaar Details are not editable, please ask your employer to update"
                )
              }
            />
          </View>
        </>
      ) : (
        <AadhaarDataCollection/>
      )}
    </View>
  );
};

export default Aadhaar;
