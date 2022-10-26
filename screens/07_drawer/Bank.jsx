import { SafeAreaView, View } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import BankFormTemplate from "../../templates/bank/Form";
import BankConfirmApi from "../../apis/bank/Confirm";
import TopTabNav from "../../navigators/TopTabNav";
import { styles } from "../../styles";

const Bank = () => {
  const accountHolderName = useSelector(
    (state) => state.bank.data.accountHolderName
  );
  const accountNumber = useSelector((state) => state.bank.data.accountNumber);
  const ifsc = useSelector((state) => state.bank.data.ifsc);
  const upi = useSelector((state) => state.bank.data.upi);
  const verifyStatus = useSelector((state) => state.bank.verifyStatus);

  const data = [
    { label: "Account Number", value: accountNumber },
    { label: "Account Holder Name", value: accountHolderName },
    { label: "IFSC Code", value: ifsc },
    { label: "UPI Id", value: upi },
    { label: "Verify Status", value: verifyStatus },
  ];

  const tabs = [
    {
      name: "Bank Data",
      component: BankFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Confirm",
      component: BankConfirmApi,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <View style={styles.card}>
            {data.map((item, index) => (
              <DetailItem
                key={index}
                label={item.label}
                value={item.value || "Not Provided"}
                divider={item?.divider}
              />
            ))}
          </View>
        </View>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Bank;
