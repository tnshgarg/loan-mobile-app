import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RazorpayCheckout from "react-native-razorpay";
import { Icon } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { RZP_KEY_ID } from "../../services/constants";
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

  const [repaymentStatus, setRepaymentStatus] = useState(
    isLoading || data.data.status == 404
      ? "PENDING"
      : data?.data.body.status || "INPROGRESS"
  );

  const repaymentId =
    isLoading || data.data.status == 404 ? "" : data?.data.body.repaymentId;
  const dueDate =
    isLoading || data.data.status == 404
      ? null
      : data?.data.body.dueDate?.split(" ")[0];
  const amount =
    isLoading || data.data.status == 404 ? 0 : data?.data.body.amount;
  const paidAmount =
    isLoading || data.data.status == 404 ? 0 : data?.data.body.paidAmount;
  const repaymentAmount =
    isLoading || data.data.status == 404
      ? 0
      : Math.max(parseInt(amount) - (parseInt(paidAmount) ?? 0), 0);

  console.log("duedate:", dueDate);
  const { data: postData, refetch: postRefetch } = PostQuery({
    amount: repaymentAmount,
    repaymentId: repaymentId,
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
    if (repaymentAmount > 0) {
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
    if (repaymentAmount > 0) {
      postRefetch().then((res) => {
        console.log("Paynow button res:", res.data.data);
        setRepaymentOrderId(res.data.data.id);
      });
    }
  };

  console.log("RepaymentAmount: ", repaymentAmount);
  console.log("RepaymentStatus: ", repaymentStatus);
  console.log(repaymentAmount < 1 || repaymentStatus === "INPROGRESS");

  useEffect(() => {
    if (isLoading) {
      console.log("Loading");
    } else {
      if (repaymentAmount < 1 || repaymentStatus === "INPROGRESS") {
        setInactive(true);
      }
    }
  }, [isLoading, isStale, data]);

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

        {repaymentAmount > 0 ? (
          <PrimaryButton
            title={
              repaymentStatus !== "INPROGRESS"
                ? inactive || loading
                  ? "Verifying"
                  : "Pay now"
                : "In Progress"
            }
            onPress={() => createRepaymentOrder()}
            disabled={inactive || loading || repaymentStatus === "INPROGRESS"}
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
                date: dueDate?.replace(/-/g, "/"),
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
            date: dueDate?.replace(/-/g, "/"),
            formatted: true,
          }) < 0
            ? `Your repayment is overdue by ${-getNumberOfDays({
                date: dueDate?.replace(/-/g, "/"),
                formatted: true,
              })} days`
            : // : DueDate?.split(" ")[0] !== null
            dueDate !== null
            ? `Due by ${dueDate?.split(" ")[0]}`
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
