import { View, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import PrimaryButton from "../../components/PrimaryButton";
import { useSelector } from "react-redux";
import PanDataCollection from "../../templates/Pan/PanDataCollection";
import TopTabNav from "../../components/TopTabNav";
import Confirm from "../../apis/pan/Confirm";

const PAN = () => {
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const dob = data?.["date_of_birth"];
  const email = data?.["email"];
  const gender = data?.["gender"];
  const name = data?.["name"];

  const verifyStatus = useSelector((state) => state.pan.verifyStatus);

  const dataDetails = [
    { label: "Full Name", value: name },
    { label: "PAN Number", value: number },
    { label: "Date of Birth", value: dob },
    { label: "Gender", value: gender },
    { label: "Email", value: email },
    { label: "Verify Status", value: verifyStatus },
  ];

  const tabs = [
    {
      name: "PAN Data",
      component: PanDataCollection,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Confirm",
      component: Confirm,
      initialParams: { type: "KYC" },
      disable: true,
    },
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
                  "The PAN Details are not editable, please ask your employer to update"
                )
              }
            />
          </View>
        </>
      ) : (
        <>
          <TopTabNav tabs={tabs} hide={true} />
        </>
      )}
    </View>
  );
};

export default PAN;
