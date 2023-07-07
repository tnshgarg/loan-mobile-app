import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import BankConfirmApi from "../../../apis/bank/Confirm";
import DetailsCard from "../../../components/molecules/DetailsCard";
import TopTabNav from "../../../navigators/TopTabNav";
import { KYC_POLLING_DURATION } from "../../../services/constants";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { styles } from "../../../styles";
import BankFormTemplate from "../../../templates/bank/Form";

const Bank = () => {
  const navigation = useNavigation();

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const { data: kycData, isLoading: loading } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );

  const { aadhaar, pan, bank } = kycData ?? {};

  useEffect(() => {
    if (!loading && bank?.verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "BANK",
        params: {
          screen: "Confirm",
        },
      });
    }
  }, [bank?.verifyStatus]);

  const cardData = () => {
    let res = [
      {
        subTitle: "Account Holder Name",
        value: bank?.data?.accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Account Number",
        value: bank?.data?.accountNumber,
      },
      { subTitle: "Bank Name", value: bank?.data?.bankName },
      {
        subTitle: "Branch Name",
        value: bank?.data?.branchName,
        fullWidth: true,
      },
      { subTitle: "Branch City", value: bank?.data?.branchCity },

      { subTitle: "IFSC", value: bank?.data?.ifsc },
      { subTitle: "UPI", value: bank?.data?.upi, fullWidth: true },
      // { subTitle: "Verify Status", value: !loading && bank?.verifyStatus },
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

  if (loading) return null;

  return (
    <SafeAreaView style={styles.safeContainer}>
      {bank?.verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} variant={"light"} />
        </View>
      ) : (
        <TopTabNav tabs={tabs} hide={true} />
      )}
    </SafeAreaView>
  );
};

export default Bank;
