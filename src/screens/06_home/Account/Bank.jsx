import { SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import BankFormTemplate from "../../../templates/bank/Form";
import BankConfirmApi from "../../../apis/bank/Confirm";
import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";

const Bank = () => {
  const navigation = useNavigation();

  const verifyStatus = useSelector((state) => state.bank.verifyStatus);
  const data = useSelector((state) => state.bank.data);
  console.log({ verifyStatus });

  useEffect(() => {
    if (verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "BANK",
        params: {
          screen: "Confirm",
        },
      });
    }
  }, [verifyStatus]);

  const cardData = () => {
    let res = [
      {
        subTitle: "Account Holder Name",
        value: data?.accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Account Number",
        value: data?.accountNumber,
      },
      { subTitle: "Bank Name", value: data?.bankName },
      { subTitle: "Branch Name", value: data?.branchName, fullWidth: true },
      { subTitle: "Branch City", value: data?.branchCity },

      { subTitle: "IFSC", value: data?.ifsc },
      { subTitle: "UPI", value: data?.upi, fullWidth: true },
      { subTitle: "Verify Status", value: verifyStatus },
    ];
    return res;
  };

  const tabs = [
    {
      name: "Form",
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
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
        </View>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Bank;
