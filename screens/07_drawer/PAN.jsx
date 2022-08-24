import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";
import PanDataCollection from "../../templates/Pan/PanDataCollection";

const PAN = () => {
  const fullName = useSelector((state) => state.pan.name);
  const panNumber = useSelector((state) => state.pan.number);
  const DOB = useSelector((state) => state.pan.dob);
  const gender = useSelector((state) => state.pan.gender);
  const email = useSelector((state) => state.pan.email);
  const verifyStatus = useSelector((state) => state.pan.verifyStatus);

  const data = [
    { label: "Full Name", value: fullName },
    { label: "PAN Number", value: panNumber },
    { label: "Date of Birth", value: DOB },
    { label: "Gender", value: gender },
    { label: "Email", value: email },
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
                  "The PAN Details are not editable, please ask your employer to update"
                )
              }
            />
          </View>
        </>
      ) : (
        <PanDataCollection />
      )}
    </View>
  );
};

export default PAN;
