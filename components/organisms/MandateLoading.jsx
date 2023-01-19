import React, { useState, useEffect } from "react";
import { View, Text, Image, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import { getBackendData } from "../../services/employees/employeeServices";
import { getPaymentState } from "../../services/mandate/Razorpay/services";
import { addVerifyStatus, resetMandate } from "../../store/slices/mandateSlice";
import { styles } from "../../styles";
import { showToast } from "../atoms/Toast";

export default function MandateLoading({ mandateVerifyStatus, navigation }) {
  const [refetchTime, setRefetchTime] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      console.log({ refetchTime });
      if (refetchTime < 60) {
        setRefetchTime(refetchTime + 1);
        if (refetchTime >= 10 && refetchTime % 5 == 0) {
          console.log("api called");
          getBackendData({
            params: { unipeEmployeeId: unipeEmployeeId },
            xpath: "mandate",
            token: token,
          })
            .then((response) => {
              if (
                response.data.status === 200 &&
                response.data?.body?.data?.orderId
              ) {
                getPaymentState({
                  orderId: response.data?.body?.data?.orderId,
                }).then((paymentStateRes) => {
                  let paymentStateData = paymentStateRes.data;
                  if (paymentStateData?.count > 0) {
                    dispatch(resetMandate(response?.data?.body));
                    dispatch(
                      addVerifyStatus(response?.data?.body?.verifyStatus)
                    );
                  } else {
                    dispatch(resetMandate(response?.data?.body));
                    dispatch(
                      addVerifyStatus(response?.data?.body?.verifyStatus)
                    );
                  }
                });
              } else {
                dispatch(resetMandate(response?.data?.body));
                dispatch(addVerifyStatus(response?.data?.body?.verifyStatus));
              }
            })
            .catch((error) => {
              console.log("mandateFetch error: ", error);
            });
        }
      } else if (refetchTime >= 60 && mandateVerifyStatus === "INPROGRESS") {
        showToast("Mandate verification In Progress");
        navigation.navigate("HomeStack", { screen: "Money" });
      } else if (mandateVerifyStatus === "ERROR") {
        showToast("Mandate verification error");
        navigation.navigate("EWA_MANDATE");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [refetchTime]);
  return (
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
        Please dont press the back button
      </Text>
    </View>
  );
}
