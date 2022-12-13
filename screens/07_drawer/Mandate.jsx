import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import MandateFormTemplate from "../../templates/mandate/Form";
import DetailItem from "./DetailItem";
import { styles } from "../../styles";
import TopTabNav from "../../navigators/TopTabNav";

const Mandate = () => {
  const [time, setTime] = useState(false);

  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType;
  const verifyStatus = mandateSlice.verifyStatus;

  const data = [
    { label: "Mandate Type", value: authType },
    { label: "Verify Status", value: verifyStatus },
  ];

  if (verifyStatus === "SUCCESS") {
    setTimeout(() => {
      setTime(true); // why this setTimeOut
    }, 2000);
  }

  const tabs = [
    {
      name: "Mandate",
      component: MandateFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {verifyStatus == "SUCCESS" && time ? (
        <View style={styles.container}>
          <View style={styles.card}>
            {data.map((item, index) => (
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
        // <MandateFormTemplate type="KYC" />
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Mandate;
