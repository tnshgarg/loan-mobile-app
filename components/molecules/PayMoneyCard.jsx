import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RazorpayCheckout from "react-native-razorpay";
import { Icon } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { createPaymentOrder } from "../../services/checkout/StandardCheckout";
import { RZP_KEY_ID } from "../../services/constants";
import { putBackendData } from "../../services/employees/employeeServices";
import PrimaryButton from "../atoms/PrimaryButton";
import { showToast } from "../atoms/Toast";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { fetchQuery, PostQuery, PostRepayment } from "../../queries/Repayment";

const PayMoneyCard = () => {
  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Error occured</Text>;

  const [inactive, setInactive] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const customerId = useSelector((state) => state.mandate.data.customerId);
  const [repaymentOrderId, setRepaymentOrderId] = useState(null);
  // const [RepaymentStatus, setRepaymentStatus] = useState(null);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  console.log("token:", token);
  console.log("unipeem:", unipeEmployeeId);

  const { data, isFetched, isLoading, isStale, isError, isSuccess, refetch } =
    fetchQuery({
      unipeEmployeeId,
      token,
    });

  const {
    mutateAsync,
    data: repaymentPostData,
    isSuccess: repaymentPostSuccess,
    isLoading: isRepaymentPostLoading,
  } = PostRepayment();

  if (repaymentPostSuccess) {
    console.log("repaymentpostsuccess:", repaymentPostData.data);
  }

  // console.log("data:", data);
  const [RepaymentStatus, setRepaymentStatus] = useState(
    isLoading || data.data.status == 404
      ? "PENDING"
      : data?.data.body.status || "INPROGRESS"
  );
  const PostRepaymentStatus = isRepaymentPostLoading
    ? "PENDING"
    : repaymentPostData?.data.status;
  const RepaymentId =
    isLoading || data.data.status == 404 ? "" : data?.data.body.repaymentId;
  const DueDate =
    isLoading || data.data.status == 404
      ? null
      : data?.data.body.dueDate?.split(" ")[0];
  const Amount =
    isLoading || data.data.status == 404 ? 0 : data?.data.body.amount;
  const PaidAmount =
    isLoading || data.data.status == 404 ? 0 : data?.data.body.paidAmount;
  const RepaymentAmount =
    isLoading || data.data.status == 404
      ? 0
      : Math.max(parseInt(Amount) - (parseInt(PaidAmount) ?? 0), 0);

  console.log("duedate:", DueDate);
  const { data: postData, refetch: postRefetch } = PostQuery({
    amount: RepaymentAmount,
    repaymentId: RepaymentId,
  });

  console.log("isStale: ", isStale);

  if (isFetched) {
    console.log("repayments:", data.data);
  }

  if (isSuccess) {
    console.log("repayments response for post isSuccess:", postData);
  }

  useEffect(() => {
    console.log(
      "createRepayment orderId: ",
      repaymentOrderId,
      !repaymentOrderId
    );
    if (RepaymentAmount > 0) {
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
            mutateAsync({
              data: {
                unipeEmployeeId: unipeEmployeeId,
                dueDate: DueDate,
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
            refetch();
            setRepaymentStatus("INPROGRESS");
            showToast("Loan Payment Successful");
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
    }
  }, [repaymentOrderId]);

  console.log("inactive: ", inactive);

  const createRepaymentOrder = () => {
    if (RepaymentAmount > 0) {
      postRefetch().then((res) => {
        console.log("Paynow button res:", res.data.data);
        setRepaymentOrderId(res.data.data.id);
      });
    }
  };

  // const createRepaymentOrder = () => {
  //   setLoading(true);
  //   if (RepaymentAmount > 0) {
  //     createPaymentOrder({
  //       amount: RepaymentAmount,
  //       repaymentId: RepaymentId,
  //     })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setRepaymentOrderId(response.data.id);
  //           console.log(
  //             "createRepaymentOrder response.data.body: ",
  //             response.data
  //           );
  //           Analytics.trackEvent("Ewa|RepaymentOrder|Success", {
  //             unipeEmployeeId: unipeEmployeeId,
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         console.log("createRepaymentOrder error: ", error);
  //         Analytics.trackEvent("Ewa|RepaymentOrder|Error", {
  //           unipeEmployeeId: unipeEmployeeId,
  //           error: error.toString(),
  //         });
  //       });
  //   } else {
  //     setLoading(false);
  //     showToast("No amount due");
  //   }
  // };

  console.log("RepaymentAmount: ", RepaymentAmount);
  console.log("RepaymentAmount: ", RepaymentStatus);
  console.log(RepaymentAmount < 1 || RepaymentStatus === "INPROGRESS");

  useEffect(() => {
    if (isLoading) {
      console.log("Loading");
    } else {
      if (RepaymentAmount < 1 || RepaymentStatus === "INPROGRESS") {
        setInactive(true);
      }
    }
  }, [isLoading, isStale, data]);

  // useEffect(() => {
  //   if (isFocused && unipeEmployeeId) {
  //     getBackendData({
  //       params: { unipeEmployeeId: unipeEmployeeId },
  //       xpath: "ewa/repayment",
  //       token: token,
  //     })
  //       .then((response) => {
  //         console.log("ewaRepaymentsFetch response.data: ", response.data);
  //         if (response.data.status === 200) {
  //           // setDueDate(response.data.body.dueDate?.split(" ")[0]);
  //           setOverdueDays(
  //             getNumberOfDays({
  //               date: dueDate?.replace(/-/g, "/"),
  //               formatted: true,
  //             })
  //           );
  //           // setRepaymentAmount(
  //           //   Math.max(
  //           //     response.data.body.amount -
  //           //       (response.data.body.paidAmount ?? 0),
  //           //     0
  //           //   )
  //           // );
  //           setRepaymentStatus(response.data.body.status);
  //           setRepaymentId(response.data.body.repaymentId);
  //           setInactive(false);
  //         } else if (response.data.status === 404) {
  //           setDueDate(null);
  //           setRepaymentAmount(0);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("ewaRepaymentsFetch error: ", error.toString());
  //       });
  //   }
  // }, [isFocused, unipeEmployeeId]);

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
              ₹{RepaymentAmount}
            </Text>
          </View>
        </View>

        {RepaymentAmount > 0 ? (
          <PrimaryButton
            title={
              RepaymentStatus !== "INPROGRESS"
                ? inactive || loading
                  ? "Verifying"
                  : "Pay now"
                : "In Progress"
            }
            onPress={() => createRepaymentOrder()}
            disabled={inactive || loading || RepaymentStatus === "INPROGRESS"}
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
                date: DueDate?.replace(/-/g, "/"),
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
            date: DueDate?.replace(/-/g, "/"),
            formatted: true,
          }) < 0
            ? `Your repayment is overdue by ${-getNumberOfDays({
                date: DueDate?.replace(/-/g, "/"),
                formatted: true,
              })} days`
            : // : DueDate?.split(" ")[0] !== null
            DueDate !== null
            ? `Due by ${DueDate?.split(" ")[0]}`
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
