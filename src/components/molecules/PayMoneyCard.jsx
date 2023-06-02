import analytics from "@react-native-firebase/analytics";
import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  getNumberOfDays,
  setYYYYMMDDtoDDMMYYYY,
} from "../../helpers/DateFunctions";
import {
  createRepaymentOrder,
  openRazorpayCheckout,
} from "../../services/mandate/Razorpay/services";
import {
  useGetRepaymentQuery,
  useUpdateRepaymentMutation,
} from "../../store/apiSlices/repaymentApi";
import { resetRepayment } from "../../store/slices/repaymentSlice";
import PrimaryButton from "../atoms/PrimaryButton";
import LinearGradient from "react-native-linear-gradient";

const PayMoneyCard = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [inactive, setInactive] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const campaignId = useSelector(
    (state) =>
      state.campaign.repaymentCampaignId ||
      state.campaign.ewaCampaignId ||
      state.campaign.onboardingCampaignId
  );

  const repaymentSlice = useSelector((state) => state.repayment);
  const [dueDate, setDueDate] = useState(repaymentSlice?.dueDate);
  const [overdueDays, setOverdueDays] = useState(repaymentSlice?.overdueDays);
  const [repaymentAmount, setRepaymentAmount] = useState(
    repaymentSlice?.repaymentAmount
  );

  const [repaymentId, setRepaymentId] = useState(repaymentSlice?.repaymentId);
  const [repaymentStatus, setRepaymentStatus] = useState(
    repaymentSlice?.repaymentStatus
  );

  const {
    isLoading: getRepaymentIsLoading,
    isSuccess: getRepaymentIsSuccess,
    isError: getRepaymentIsError,
    error: getRepaymentError,
    data: getRepaymentData,
  } = useGetRepaymentQuery(unipeEmployeeId);

  const [updateRepayment] = useUpdateRepaymentMutation();
  useEffect(() => {
    console.log("ewaRepaymentFetch API: ", getRepaymentData);
    if (isFocused && !getRepaymentIsLoading) {
      if (getRepaymentData?.status === 200) {
        let repaymentAmount = Math.max(
          getRepaymentData?.body?.amount -
            (getRepaymentData?.body?.paidAmount ?? 0),
          0
        );
        let repaymentStatus = getRepaymentData?.body?.status;
        if (repaymentAmount > 0 && repaymentStatus !== "SUCCESS") {
          let timestamp = getRepaymentData?.body?.dueDate?.split(" ");
          let date = timestamp[0];
          let formattedDueDate = setYYYYMMDDtoDDMMYYYY(date);
          setDueDate(formattedDueDate);
          setOverdueDays(
            getNumberOfDays({
              date: formattedDueDate?.replace(/-/g, "/"),
              formatted: false,
            })
          );
          setRepaymentAmount(repaymentAmount);
          setRepaymentStatus(repaymentStatus);
          setRepaymentId(getRepaymentData?.body?.repaymentId);
          setInactive(false);
        } else if (repaymentAmount < 1 || repaymentStatus === "INPROGRESS") {
          setInactive(true);
        }
      } else if (getRepaymentError?.status === 404) {
        console.log(
          "ewaRepaymentFetch API status error getRepaymentData.data: ",
          getRepaymentError.body
        );
        dispatch(resetRepayment());
        setDueDate(null);
        setOverdueDays(0);
        setRepaymentAmount(0);
        setRepaymentId(null);
        setRepaymentStatus(null);
        setInactive(true);
      }
    } else if (getRepaymentIsError) {
      console.log(
        "ewaRepaymentFetch API error getRepaymentError.message: ",
        getRepaymentError.message
      );
      dispatch(resetRepayment());
      setInactive(true);
    }
  }, [
    getRepaymentIsLoading,
    getRepaymentIsSuccess,
    getRepaymentData,
    isFocused,
  ]);

  const backendPush = ({ data, status }) => {
    setRepaymentStatus(status);
    let repaymentData = {
      unipeEmployeeId: unipeEmployeeId,
      dueDate: dueDate,
      data: data,
      status: status,
      campaignId: campaignId,
    };
    return updateRepayment(repaymentData)
      .then((res) => {
        console.log("repaymentPush response: ", res?.data);
        if (res?.data.status === 200) {
          setRepaymentStatus(status);
        } else {
          setRepaymentStatus(res?.data.paymentStatus);
        }
      })
      .catch((error) => {
        console.log("repaymentPush error: ", error);
        throw error;
      });
  };

  const initiateRazorpayCheckout = async ({ orderId, customerId }) => {
    let data;
    try {
      const res = await openRazorpayCheckout({
        orderId,
        customerId,
        description: "Unipe Early Loan Repayment",
        prefill: {
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
        },
      });
      console.log("ewaRepayment Checkout RazorpayCheckout data: ", res);
      data = {
        orderId,
        customerId,
        paymentId: res.razorpay_payment_id,
        paymentSignature: res.razorpay_signature,
        provider: "razorpay",
        checkoutMsg: "Repayment Initiated from App Checkout Success",
      };
      analytics().logEvent("Ewa_Repayment_Success", {
        unipeEmployeeId: unipeEmployeeId,
      });
    } catch (error) {
      console.log("ewaRepayment Checkout error: ", error);
      data = {
        orderId,
        customerId,
        provider: "razorpay",
        checkoutMsg: error.message,
      };
      analytics().logEvent("Ewa_Repayment_Error", {
        unipeEmployeeId: unipeEmployeeId,
      });
    } finally {
      backendPush({
        data: data,
        status: "INPROGRESS",
      })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("Error", error?.message || "Something went wrong");
        });
    }
  };

  const initiatePayment = async () => {
    if (repaymentAmount > 0) {
      try {
        setLoading(true);
        const res = await createRepaymentOrder({
          unipeEmployeeId,
          repaymentIds: [repaymentId],
          token,
        });
        let repaymentOrder = res.data.body;
        await initiateRazorpayCheckout({
          orderId: repaymentOrder.id,
          customerId: repaymentOrder.customer_id,
        });
      } catch (error) {
        Alert.alert("Error", error.message);
        analytics().logEvent("Ewa_Repayment_Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.message,
        });
        setLoading(false);
      }
    }
  };

  if (repaymentAmount > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text
              style={[
                styles.text,
                {
                  ...FONTS.h3,
                  color: overdueDays < 0 ? COLORS.warning : COLORS.black,
                },
              ]}
            >
              ₹{repaymentAmount}
            </Text>
            <Text style={styles.text}>Amount Due</Text>
          </View>

          <PrimaryButton
            title={
              repaymentStatus !== "INPROGRESS"
                ? inactive || loading
                  ? "Verifying"
                  : "Pay now"
                : "In Progress"
            }
            onPress={() => initiatePayment()}
            disabled={inactive || loading || repaymentStatus === "INPROGRESS"}
            containerStyle={{ width: "35%", marginTop: 0 }}
            titleStyle={{ ...FONTS.body3 }}
          />
        </View>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            overdueDays < 0 ? COLORS.warningBackground : COLORS.lightGreen,
            overdueDays < 0 ? COLORS.warningBackground : COLORS.lightYellow,
          ]}
          style={styles.bottomCard}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={18}
            color={overdueDays < 0 ? COLORS.warning : COLORS.gray}
          />
          <Text
            style={[
              styles.text,
              {
                marginLeft: 5,
                color: overdueDays < 0 ? COLORS.warning : COLORS.gray,
              },
            ]}
          >
            {overdueDays < 0
              ? `Your repayment is overdue by ${-overdueDays} days`
              : dueDate !== null
              ? `Due by ${dueDate}`
              : `No dues`}
          </Text>
        </LinearGradient>
      </View>
    );
  } else {
    return null;
  }
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.lightgray_01,
    borderRadius: "10rem",
  },
  row: {
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.moneyCardBg,
    borderTopLeftRadius: "10rem",
    borderTopRightRadius: "10rem",
  },
  bottomCard: {
    paddingHorizontal: "15rem",
    paddingVertical: "10rem",
    alignItems: "center",
    borderBottomLeftRadius: "10rem",
    borderBottomRightRadius: "10rem",
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: { ...FONTS.body4, color: COLORS.gray },
});

export default PayMoneyCard;
