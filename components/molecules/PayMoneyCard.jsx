import { useIsFocused } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useQuery } from "@tanstack/react-query";
import RazorpayCheckout from "react-native-razorpay";
import { Icon } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { RZP_KEY_ID } from "../../services/constants";
import PrimaryButton from "../atoms/PrimaryButton";
import { showToast } from "../atoms/Toast";
import { getNumberOfDays, setYYYYMMDDtoDDMMYYYY } from "../../helpers/DateFunctions";
import { getRepayment, createRazorpayOrder, updateRepayment } from "../../queries/ewa/repayment";
import { resetRepayment } from "../../store/slices/repaymentSlice";

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
  const customerId = useSelector((state) => state.mandate.data.customerId);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const campaignId = useSelector((state) => state.campaign.repaymentCampaignId || state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId);

  const repaymentSlice = useSelector((state) => state.repayment);
  const [repaymentOrderId, setRepaymentOrderId] = useState(repaymentSlice?.repaymentOrderId);
  const [dueDate, setDueDate] = useState(repaymentSlice?.dueDate);
  const [overdueDays, setOverdueDays] = useState(repaymentSlice?.overdueDays);
  const [repaymentAmount, setRepaymentAmount] = useState(repaymentSlice?.repaymentAmount);
  const [repaymentId, setRepaymentId] = useState(repaymentSlice?.repaymentId);
  const [repaymentStatus, setRepaymentStatus] = useState(repaymentSlice?.repaymentStatus);

  const {
    isLoading: getRepaymentIsLoading,
    isSuccess: getRepaymentIsSuccess,
    isError: getRepaymentIsError,
    error: getRepaymentError,
    data: getRepaymentData,
  } = useQuery(['getRepayment', unipeEmployeeId, token], getRepayment, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 11,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isFocused && !getRepaymentIsLoading && getRepaymentIsSuccess) {
      if (getRepaymentData.data.status === 200) {
        var repaymentAmount = Math.max(
          getRepaymentData?.data?.body?.amount -
            (getRepaymentData?.data?.body?.paidAmount ?? 0),
          0
        );
        var repaymentStatus = getRepaymentData?.data?.body?.status;
        if (repaymentAmount > 0 && repaymentStatus !== "SUCCESS") {
          var timestamp = getRepaymentData?.data?.body?.dueDate?.split(" ");
          var date = timestamp[0];
          var formattedDueDate = setYYYYMMDDtoDDMMYYYY(date);
          setDueDate(formattedDueDate);
          setOverdueDays(
            getNumberOfDays({
              date: formattedDueDate?.replace(/-/g, "/"),
              formatted: false,
            })
          );
          setRepaymentAmount(repaymentAmount);
          setRepaymentStatus(repaymentStatus);
          setRepaymentId(getRepaymentData?.data?.body?.repaymentId);
          setInactive(false);
        } else if (repaymentAmount < 1 || repaymentStatus === "INPROGRESS") {
          setInactive(true);
        }
      } else if (getRepaymentData.data.status === 404) {
        console.log("ewaRepaymentFetch API status error getRepaymentData.data: ", getRepaymentData.data);
        dispatch(resetRepayment());
        setDueDate(null);
        setOverdueDays(0);
        setRepaymentAmount(0);
        setRepaymentId(null);
        setRepaymentOrderId(null);
        setRepaymentStatus(null);
        setInactive(true);
      }
    } else if (getRepaymentIsError) {
      console.log("ewaRepaymentFetch API error getRepaymentError.message: ", getRepaymentError.message);
      dispatch(resetRepayment());
      setInactive(true);
    }
  }, [getRepaymentIsLoading, getRepaymentIsSuccess, getRepaymentData, isFocused]);

  console.log("repaymentSlice, repaymentAmount: ", repaymentSlice, repaymentAmount, dueDate, repaymentId, repaymentOrderId, repaymentStatus);

  const {mutateAsync: updateRepaymentMutateAsync} = updateRepayment();

  const { mutateAsync: createRazorpayOrderMutateAsync } = createRazorpayOrder({
    amount: repaymentAmount,
    repaymentId: repaymentId,
  });

  useEffect(() => {
    console.log(
      "createRepayment repaymentOrderId: ",
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
        console.log("ewaRepayment Checkout RazorpayCheckout options: ", options);
        RazorpayCheckout.open(options)
          .then((data) => {
            console.log("ewaRepayment Checkout RazorpayCheckout data: ", data);
            updateRepaymentMutateAsync({
              data: {
                unipeEmployeeId: unipeEmployeeId,
                dueDate: dueDate,
                status: "INPROGRESS",
                campaignId: campaignId,
              },
              token: token,
            })
              .then((response) => {
                console.log("ewaRepayment Checkout Post response.data: ", response?.data);
                if (response?.data?.status === 200) {
                  setRepaymentStatus("INPROGRESS");
                  showToast("Loan Payment In Progress");
                  setLoading(false);
                  Analytics.trackEvent("Ewa|Repayment|Success", {
                    unipeEmployeeId: unipeEmployeeId,
                  });
                } else {
                  showToast("Loan Payment Failed. Please try again.");
                  setLoading(false);
                  Analytics.trackEvent("Ewa|RepaymentPost|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                  });
                }
              })
              .catch((error) => {
                console.log("ewaRepayment Checkout Post error: ", error.toString());
                showToast("Loan Payment Failed. Please try again.");
                setLoading(false);
                Analytics.trackEvent("Ewa|Repayment|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: error.toString(),
                });
              });
          })
          .catch((error) => {
            console.log("ewaRepayment Checkout error.description: ", error.description);
            showToast("Loan Payment Failed. Please try again.");
            setLoading(false);
            Analytics.trackEvent("Ewa|Repayment|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: error.description,
            });
          });
      }
    }
  }, [repaymentOrderId]);

  const createRepaymentOrder = () => {
    if (repaymentAmount > 0) {
      createRazorpayOrderMutateAsync()
        .then((res) => {
          console.log("Paynow button res:", res?.data);
          setRepaymentOrderId(res?.data?.id);
        })
        .catch((error) => {
          var errorObj = "";
          if (error.error) {
            errorObj = error.error;
          } else {
            errorObj = error;
          }
          console.log("ewaRepayment Checkout error: ", errorObj.description);
          showToast("Loan Payment Failed. Please try again.");
          setLoading(false);
          Analytics.trackEvent("Ewa|Repayment|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        });
    }
  };

  if (repaymentAmount > 0) {
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
            {
              overdueDays < 0
              ? `Your repayment is overdue by ${overdueDays} days`
              : dueDate !== null
              ? `Due by ${dueDate}`
              : `No dues`}
          </Text>
        </View>
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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: { ...FONTS.body4, color: COLORS.white },
});

export default PayMoneyCard;
