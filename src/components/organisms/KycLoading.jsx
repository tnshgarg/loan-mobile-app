import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { strings } from "../../helpers/Localization";
import { navigate } from "../../navigators/RootNavigation";
import { useGetOfferQuery } from "../../store/apiSlices/ewaApi";
import { styles } from "../../styles";
import { showToast } from "../atoms/Toast";

export default function KycLoading({
  modalVisible,
  setModalVisible,
  mandateData
}) {
  const navigation = useNavigation();
  const [refetchTime, setRefetchTime] = useState(0);
  const offerId = useSelector((state) => state.ewaLive.offerId);
  // TODO: fix 2 intervals
  const { data : offerData, error, isLoading } = useGetOfferQuery(offerId, {
    pollingInterval: 1000 * 10,
  });
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      console.log({ refetchTime });
      if (refetchTime <= 60) {
        setRefetchTime(refetchTime + 10);
        if (refetchTime % 10 == 0) {
          console.log("offer api called");
          if (offerData && !isLoading && !error) {
            console.log("kycLoader", offerData);
            if (offerData.stage == "ERROR") {
              showToast(
                "Details verification Failed, Please Try Again",
                "warning"
              );
              setModalVisible(false);
            }
            if (offerData.stage == "AGREEMENT") {
              showToast("Details verification Successful", "success");
              setModalVisible(false);
              if (mandateData?.verifyStatus === "SUCCESS") {
                navigation.navigate("EWA_AGREEMENT");
              } else {
                navigation.navigate("EWA_MANDATE");
              }
            }
          }
        }
      } else if (refetchTime > 60) {
        setModalVisible(false);
        if (offerData.stage === "KYC") {
          showToast("document verification In Progress", "pending");
          navigate("HomeStack", { screen: "Money" });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchTime]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={styles.safeContainer}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/coin_loading.gif")}
          style={{ width: "100%", height: SIZES.height * 0.5 }}
        />
        <View style={{ flex: 1 }} />
        <Text style={[styles.headline, { ...FONTS.h3 }]}>
        Updating loan details
        </Text>
        <Text style={styles.subHeadline}>{strings.mayTakeFewSeconds}</Text>
        <View
          style={{
            width: "100%",
            backgroundColor: COLORS.lightGray,
            height: 5,
            marginTop: "2%",
          }}
        >
          <View
            style={{
              width: `${(refetchTime / 60) * 100}%`,
              backgroundColor: COLORS.primary,
              height: 5,
            }}
          />
        </View>
        <View style={{ flex: 1 }} />
        <Text style={[styles.subHeadline, { marginBottom: "10%" }]}>
          {strings.dontPressBack}
        </Text>
      </View>
    </Modal>
  );
}
