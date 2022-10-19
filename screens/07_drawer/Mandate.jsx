import React, { useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import Form from "../../templates/mandate/Form";
import DetailItem from "./DetailItem";
import { styles } from "../../styles";

const Mandate = () => {
  const mandate = useSelector((state) => state.mandate);
  const verifyStatus = mandate?.verifyStatus;
  const type = mandate?.data?.type;
  const [time, setTime] = useState(false);
  const dataDetails = [
    { label: "Mandate Type", value: type },
    { label: "Verify Status", value: verifyStatus },
  ];
  if (verifyStatus === "SUCCESS") {
    setTimeout(() => {
      setTime(true);
    }, 2000);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus === "SUCCESS"
        ? Alert.alert("Mandate Verified Successfully")
        : null}
      {verifyStatus == "SUCCESS" && time ? (
        <View style={styles.container}>
          {dataDetails.map((item, index) => (
            <DetailItem
              key={index}
              label={item.label}
              value={item.value || "Not Provided"}
              divider
            />
          ))}
        </View>
      ) : (
        <Form />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
