import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import PanConfirmApi from "../../../apis/pan/Confirm";
import DetailsCard from "../../../components/molecules/DetailsCard";
import { strings } from "../../../helpers/Localization";
import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import PanFormTemplate from "../../../templates/pan/Form";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { useGetKycQuery } from "../../../store/apiSlices/kycApi";
import { KYC_POLLING_DURATION } from "../../../services/constants";

const Pan = () => {
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
    if (pan?.verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "PAN",
        params: {
          screen: "Confirm",
        },
      });
    }
    return () => {};
  }, [pan?.verifyStatus]);

  const cardData = () => {
    let res = [
      { subTitle: "Name", value: pan?.data?.name, fullWidth: true },
      { subTitle: "Number", value: pan?.number },
      { subTitle: "Date of Birth", value: pan?.data?.date_of_birth },
      { subTitle: "Gender", value: pan?.data?.gender },
      { subTitle: "Email", value: pan?.data?.email, fullWidth: true },
      // { subTitle: "Verify Status", value: pan?.verifyStatus },
    ];
    return res;
  };

  const tabs = [
    {
      name: "Form",
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

  if (loading) return <></>;

  return (
    <SafeAreaView style={styles.safeContainer}>
      {pan?.verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} variant={"light"} />
          {bank?.verifyStatus != "SUCCESS" ? (
            <PrimaryButton
              title={strings.continueBankVerification}
              onPress={() => {
                navigation.navigate("KYC", {
                  screen: "BANK",
                });
              }}
            />
          ) : null}
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
