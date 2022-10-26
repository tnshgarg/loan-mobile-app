import { SafeAreaView, View } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import PanFormTemplate from "../../templates/pan/Form";
import TopTabNav from "../../navigators/TopTabNav";
import PanConfirmApi from "../../apis/pan/Confirm";
import { styles } from "../../styles";

const Pan = () => {
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
      component: PanFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Confirm",
      component: PanConfirmApi,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <View style={styles.card}>
            {dataDetails.map((item, index) => (
              <DetailItem
                key={index}
                label={item.label}
                value={item.value || "Not Provided"}
                divider={item.divider}
              />
            ))}
          </View>
        </View>
      ) : (
        <>
          <TopTabNav tabs={tabs} hide={true} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Pan;
