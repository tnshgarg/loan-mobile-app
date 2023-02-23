import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import PanConfirmApi from "../../../apis/pan/Confirm";
import DetailsCard from "../../../components/molecules/DetailsCard";
import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import PanFormTemplate from "../../../templates/pan/Form";

const Pan = () => {
  const navigation = useNavigation();

  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const verifyStatus = useSelector((state) => state.pan.verifyStatus);

  useEffect(() => {
    if (verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "PAN",
        params: {
          screen: "Confirm",
        },
      });
    }
  }, [verifyStatus]);

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number, fullWidth: true },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Email", value: data?.email, fullWidth: true },
      { subTitle: "Verify Status", value: verifyStatus },
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
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
