import { useIsFocused } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RazorpayCheckout from "react-native-razorpay";
import { Icon } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { createPaymentOrder } from "../../services/checkout/StandardCheckout";
import { EMPLOYEE_API_URL, RZP_KEY_ID } from "../../services/constants";
import {
  getBackendData,
  getFetchBackendData,
  putBackendData,
} from "../../services/employees/employeeServices";
import PrimaryButton from "../atoms/PrimaryButton";
import { showToast } from "../atoms/Toast";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PayMoneyCard = () => {
  const isFocused = useIsFocused();

  const [inactive, setInactive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [repaymentStatus, setRepaymentStatus] = useState("PENDING");

  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const customerId = useSelector((state) => state.mandate.data.customerId);
  const [repaymentOrderId, setRepaymentOrderId] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [overdueDays, setOverdueDays] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [repaymentId, setRepaymentId] = useState(null);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const fetchRepayment = async () => {
    // return getFetchBackendData({
    //   params: { unipeEmployeeId: unipeEmployeeId },
    //   xpath: "ewa/repayment",
    //   token: token,
    // }).then((resp) => console.log("fetchRepaymentOrder: ", resp));
    var url = `${EMPLOYEE_API_URL}/ewa/repayment`;

    return await axios({
      method: "GET",
      url: `${url}?unipeEmployeeId=${unipeEmployeeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // .then((res) => {
    //   res.data;
    //   console.log("fetchrpResp:", res.data);
    // });
    // .catch((err) => console.log("FETCH error: ", err));
    // .then((resp) => console.log("fetchrpResp:", resp))
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    ["repayments"],
    fetchRepayment,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  );

  // useEffect(() => {
  //   refetch();
  // }, []);

  // const dueDateVal = getNumberOfDays({
  //   date: repayment.data.body.dueDate?.replace(/-/g, "/"),
  //   formatted: true,
  // });

  useEffect(() => {
    console.log(
      "createRepayment orderId: ",
      repaymentOrderId,
      !repaymentOrderId
    );
    if (repaymentOrderId) {
      var options = {
        description: "Unipe Early Loan Repayment",
        name: "Unipe",
        key: RZP_KEY_ID,
        order_id: repaymentOrderId,
        customer_id: customerId,
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
          putBackendData({
            data: {
              unipeEmployeeId: unipeEmployeeId,
              dueDate: dueDate,
              status: "INPROGRESS",
            },
            xpath: "ewa/repayment",
            token: token,
          })
            .then((response) => {
              console.log("ewaRepaymentsPost response.data: ", response.data);
            })
            .catch((error) => {
              console.log("ewaRepaymentsPost error: ", error.toString());
            });
          showToast("Loan Payment Successful");
          // setRepaymentStatus("INPROGRESS");
          setLoading(false);
          Analytics.trackEvent("Ewa|Repayment|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("checkout error:", error.description);
          showToast("Loan Payment Failed. Please try again.");
          setLoading(false);
          Analytics.trackEvent("Ewa|Repayment|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        });
    }
  }, [repaymentOrderId]);

  const createRepaymentOrder = () => {
    setLoading(true);
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
          setLoading(false);
          console.log("createRepaymentOrder error: ", error);
          Analytics.trackEvent("Ewa|RepaymentOrder|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        });
    } else {
      setLoading(false);
      showToast("No amount due");
    }
  };

  useEffect(() => {
    if (repaymentAmount < 1 || repaymentStatus === "INPROGRESS") {
      setInactive(true);
    }
  }, [repaymentAmount, repaymentStatus]);

  if (!isLoading) console.log("repayments: ", data.data);

  useEffect(() => {
    if (isFocused && unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "ewa/repayment",
        token: token,
      })
        .then((response) => {
          console.log("ewaRepaymentsFetch response.data: ", response.data);
          if (response.data.status === 200) {
            // setDueDate(response.data.body.dueDate?.split(" ")[0]);
            setOverdueDays(
              getNumberOfDays({
                date: dueDate?.replace(/-/g, "/"),
                formatted: true,
              })
            );
            // setRepaymentAmount(
            //   Math.max(
            //     response.data.body.amount -
            //       (response.data.body.paidAmount ?? 0),
            //     0
            //   )
            // );
            setRepaymentStatus(response.data.body.status);
            setRepaymentId(response.data.body.repaymentId);
            setInactive(false);
          } else if (response.data.status === 404) {
            setDueDate(null);
            setRepaymentAmount(0);
          }
        })
        .catch((error) => {
          console.log("ewaRepaymentsFetch error: ", error.toString());
        });
    }
  }, [isFocused, unipeEmployeeId]);

  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Error occured</Text>;

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
              {/* ₹{repaymentAmount} */}₹
              {Math.max(
                parseInt(data.data.body.amount) -
                  (parseInt(data.data.body.paidAmount) ?? 0),
                0
              )}
            </Text>
          </View>
        </View>

        {Math.max(
          parseInt(data.data.body.amount) -
            (parseInt(data.data.body.paidAmount) ?? 0),
          0
        ) > 0 ? (
          <PrimaryButton
            title={
              data.data.body.status !== "INPROGRESS"
                ? inactive || loading
                  ? "Verifying"
                  : "Pay now"
                : "In Progress"
            }
            onPress={() => createRepaymentOrder()}
            disabled={
              inactive || loading || data.data.body.status === "INPROGRESS"
            }
            containerStyle={{ width: null, marginTop: 0, height: 40 }}
            titleStyle={{ ...FONTS.h5 }}
          />
        ) : null}
      </View>

      <View
        style={[
          styles.bottomCard,
          {
            backgroundColor:
              getNumberOfDays({
                date: data.data.body.dueDate?.replace(/-/g, "/"),
                formatted: true,
              }) < 0
                ? COLORS.warning
                : COLORS.moneyCardBg,
          },
        ]}
      >
        <Icon name="info-outline" size={18} color={COLORS.white} />
        <Text style={[styles.text, { marginLeft: 5 }]}>
          {getNumberOfDays({
            date: data.data.body.dueDate?.replace(/-/g, "/"),
            formatted: true,
          }) < 0
            ? `Your repayment is overdue by ${-getNumberOfDays({
                date: data.data.body.dueDate?.replace(/-/g, "/"),
                formatted: true,
              })} days`
            : data.data.body.dueDate?.split(" ")[0] !== null
            ? `Due by ${data.data.body.dueDate?.split(" ")[0]}`
            : `No dues`}
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
