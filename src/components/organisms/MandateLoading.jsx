import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { useGetMandateQuery } from "../../store/apiSlices/mandateApi";
import { addVerifyStatus, resetMandate } from "../../store/slices/mandateSlice";
import { styles } from "../../styles";
import { showToast } from "../atoms/Toast";

export default function MandateLoading({
  mandateVerifyStatus,
  setMandateVerifyStatus,
  modalVisible,
  setModalVisible,
}) {
  const [refetchTime, setRefetchTime] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const navigation = useNavigation();
  const { data, error, isLoading } = useGetMandateQuery(unipeEmployeeId);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      console.log({ refetchTime });
      if (refetchTime <= 60) {
        setRefetchTime(refetchTime + 10);
        if (refetchTime % 10 == 0) {
          console.log("api called");
          if (data && !isLoading && !error) {
            console.log("mandateLoader", data);
            let mandateData = data?.body;
            dispatch(resetMandate(mandateData));
            dispatch(addVerifyStatus(data?.body?.verifyStatus));
            setMandateVerifyStatus(data?.body?.verifyStatus);
            if (mandateData.verifyStatus == "ERROR") {
              showToast(
                "Mandate Registration Failed, Please Try Again",
                "warning"
              );
              setModalVisible(false);
            }
          }
        }
      } else if (refetchTime > 60) {
        setModalVisible(false);
        if (mandateVerifyStatus === "INPROGRESS") {
          showToast("Mandate verification In Progress", "pending");
          navigation.navigate("HomeStack", { screen: "Money" });
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
          Updating mandate registration details
        </Text>
        <Text style={styles.subHeadline}>This may take few seconds</Text>
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
          Please don't press the back button
        </Text>
      </View>
    </Modal>
  );
}
