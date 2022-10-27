import { React, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import MandateFormTemplate from "../../templates/mandate/Form";
import DetailItem from "./DetailItem";
import { styles } from "../../styles";

const Mandate = () => {
  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice?.data?.authType;
  const verifyStatus = mandateSlice?.verifyStatus;
  const [time, setTime] = useState(false);
  const dataDetails = [
    { label: "Mandate Type", value: authType },
    { label: "Verify Status", value: verifyStatus },
  ];

  if (verifyStatus === "SUCCESS") {
    setTimeout(() => {
      setTime(true);
    }, 2000);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus == "SUCCESS" && time ? (
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
        <MandateFormTemplate />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
