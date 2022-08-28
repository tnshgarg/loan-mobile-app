import React from "react";
import { Alert, View } from "react-native";
import { useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import AadhaarDataCollection from "../../templates/Aadhaar/AadhaarDataCollection";
import DetailItem from "./DetailItem";

const Aadhaar = () => {
  const data = useSelector((state) => state.aadhaar.data["aadhaar_data"]);
  const number = useSelector((state) => state.aadhaar.number);
  const address = data?.["address"];
  const dob = data?.["date_of_birth"];
  const name = data?.["name"];
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const dataDetails = [
    { label: "Full Name", value: name },
    { label: "Date of Birth", value: dob },
    { label: "Aadhaar Number", value: number },
    { label: "Address", value: address },
    { label: "Verify Status", value: verifyStatus },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus == "SUCCESS" ? (
        <>
          {dataDetails.map((item, index) => (
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
