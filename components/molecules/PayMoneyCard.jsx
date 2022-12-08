import { useIsFocused } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RazorpayCheckout from "react-native-razorpay";
import { Icon } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { createPaymentOrder } from "../../services/checkout/StandardCheckout";
import { RZP_KEY_ID } from "../../services/constants";
import { getBackendData } from "../../services/employees/employeeServices";
import PrimaryButton from "../atoms/PrimaryButton";
import { showToast } from "../atoms/Toast";
import { getNumberOfDays } from "../../helpers/DateFunctions";

const PayMoneyCard = () => {
  const isFocused = useIsFocused();

  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const extCustomerId = useSelector(
    (state) => state.mandate.data.extCustomerId
  );
  const [repaymentOrderId, setRepaymentOrderId] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [overdueDays, setOverdueDays] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState(null);
  const [repaymentId, setRepaymentId] = useState(null);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("createMandate orderId: ", repaymentOrderId, !repaymentOrderId);
    if (repaymentOrderId) {
      var options = {
        description: "Unipe Early Loan Repayment",
        name: "Unipe",
        key: RZP_KEY_ID,
        order_id: repaymentOrderId,
        customer_id: extCustomerId,
        prefill: {
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
        },
        theme: { color: COLORS.primary },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          console.log("RazorpayCheckout data: ", data);
          Analytics.trackEvent("Ewa|Repayment|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
          showToast("Loan Payment Successful");
        })
        .catch((error) => {
          console.log("checkout error:", error.description);
          Analytics.trackEvent("Ewa|Repayment|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
          showToast("Loan Payment Failed. Please try again.");
        });
    }
  }, [repaymentOrderId]);

  useEffect(() => {
    if (isFocused && unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/repayment",
        token: token,
      })
        .then((response) => {
          if (response.data.status === 200) {
            console.log("ewaRepaymentsFetch response.data: ", response.data);
            setDueDate(response.data.body.dueDate?.split(" ")[0]);
            setOverdueDays(
              getNumberOfDays({
                date: dueDate?.replace(/-/g, "/"),
                formatted: true,
              })
            );
            setRepaymentAmount(response.data.body.amount);
            setRepaymentId(response.data.body.repaymentId);
          } else {
            console.log("ewaRepaymentsFetch error: ", response.data);
          }
        })
        .catch((error) => {
          console.log("ewaRepaymentsFetch error: ", error.toString());
        });
    }
  }, [isFocused, unipeEmployeeId]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.text}>Your total amount due</Text>
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
            }}
          >
            <Text
              style={[styles.text, { ...FONTS.h3, color: COLORS.secondary }]}
            >
              ₹{repaymentAmount}
            </Text>
          </View>
        </View>
        <PrimaryButton
          title={"Pay now"}
          onPress={() => {
            if (repaymentAmount > 0) {
              createPaymentOrder({
                amount: repaymentAmount,
                repaymentId: repaymentId,
              })
                .then((response) => {
                  if (response.status === 200) {
                    setRepaymentOrderId(response.data.id);
                    console.log(
                      "createRepaymentOrder response.data.body: ",
                      response.data
                    );
                    Analytics.trackEvent("Ewa|RepaymentOrder|Success", {
                      unipeEmployeeId: unipeEmployeeId,
                    });
                  }
                })
                .catch((error) => {
                  console.log("createRepaymentOrder error: ", error);
                  Analytics.trackEvent("Ewa|Repayment|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                    error: error.toString(),
                  });
                });
            } else {
              showToast("No amount due");
            }
          }}
          containerStyle={{ width: null, marginTop: 0, height: 40 }}
          titleStyle={{ ...FONTS.h5 }}
        />
      </View>
      {console.log("overdueDays: ", overdueDays)}

      <View
        style={[
          styles.bottomCard,
          {
            backgroundColor:
              overdueDays < 0 ? COLORS.warning : COLORS.moneyCardBg,
          },
        ]}
      >
        <Icon name="info-outline" size={18} color={COLORS.white} />
        <Text style={[styles.text, { marginLeft: 5 }]}>
          {overdueDays < 0
            ? `Your repayment is overdue by ${-overdueDays} days`
            : `Due by ${dueDate}`}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 5,
  },
  row: {
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.moneyCardBg,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bottomCard: {
    paddingHorizontal: "15rem",
    paddingVertical: "10rem",
    alignItems: "center",
    backgroundColor: COLORS.moneyCardBg,
    borderTopWidth: 1.5,
    borderColor: COLORS.lightGray,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    opactiy: 0.5,
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: { ...FONTS.body4, color: COLORS.white },
});

export default PayMoneyCard;
