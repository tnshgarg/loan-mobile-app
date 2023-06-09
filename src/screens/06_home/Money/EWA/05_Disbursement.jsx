import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Failure from "../../../../assets/animations/Failure";
import Hourglass from "../../../../assets/Hourglass.svg";
import Success from "../../../../assets/animations/Success";
import Header from "../../../../components/atoms/Header";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import { useGetDisbursementQuery } from "../../../../store/apiSlices/ewaApi";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";
import SvgContainer from "../../../../components/atoms/SvgContainer";
import { COLORS, FONTS } from "../../../../constants/Theme";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";

const Disbursement = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { offer } = route.params;

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const bankSlice = useSelector((state) => state.bank);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [dueDate, setDueDate] = useState("");
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [status, setStatus] = useState("");
  console.log({ status });

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Money",
      params: { screen: "EWA" },
    });
    return true;
  };

  useEffect(() => {
    dispatch(addCurrentScreen("EWA_Disbursement"));
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const StatusImage = (status) => {
    switch (status) {
      case "SUCCESS":
        return (
          <SvgContainer height={200} width={200}>
            <Success />
          </SvgContainer>
        );
      case "REJECTED":
        return (
          <SvgContainer height={300} width={300}>
            <Failure />
          </SvgContainer>
        );
      case "FAILURE":
        return (
          <SvgContainer height={300} width={300}>
            <Failure />
          </SvgContainer>
        );
      default:
        return (
          <SvgContainer height={200} width={200}>
            <Hourglass />
          </SvgContainer>
        );
    }
  };

  const getStatusText = (headline, subheadline) => {
    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text
          style={[
            styles.headline,
            { marginTop: "10%", color: COLORS.black, ...FONTS.body2 },
          ]}
        >
          {headline}
        </Text>
        <Text
          style={[styles.subHeadline, { color: COLORS.gray, ...FONTS.body3 }]}
        >
          {subheadline}
        </Text>
      </View>
    );
  };

  const StatusText = (status) => {
    switch (status) {
      case "SUCCESS":
        return getStatusText(
          "Congratulations",
          "Your advance salary has been credited to your bank account."
        );
      case "REJECTED":
        return getStatusText(
          "Sorry, we could not process your advance salary request!",
          "You request could not clear our lending parter policies. Please reach out to us to become eligible."
        );
      case "FAILURE":
        return getStatusText(
          "Sorry, we could not process your advance salary request!",
          "You request could not clear our lending parter policies. Please reach out to us to become eligible."
        );
      default:
        return getStatusText(
          "Your advance salary request is being processed!",
          "The amount will be disbursed after successful verification and we will notify you once it is disbursed."
        );
    }
  };

  const {
    isSuccess: getDisbursementIsSuccess,
    isError: getDisbursementIsError,
    error: getDisbursementError,
    data: getDisbursementData,
  } = useGetDisbursementQuery({
    offerId: offer?.offerId,
    unipeEmployeeId: unipeEmployeeId,
  });

  useEffect(() => {
    console.log("getDisbursementIsSuccess", offer);
    console.log("getDisbursementData", getDisbursementData);
    if (getDisbursementIsSuccess) {
      if (getDisbursementData?.status === 200) {
        setBankAccountNumber(getDisbursementData?.body?.bankAccountNumber);
        setDueDate(getDisbursementData?.body?.dueDate);
        setLoanAccountNumber(getDisbursementData?.body?.loanAccountNumber);
        setLoanAmount(getDisbursementData?.body?.loanAmount);
        setNetAmount(getDisbursementData?.body?.netAmount);
        setStatus(getDisbursementData?.body?.status);
      } else {
        console.log(" API error getDisbursementData : ", getDisbursementData);
      }
    } else if (getDisbursementIsError) {
      console.log("API error getDisbursementError : ", getDisbursementError);
    }
  }, [getDisbursementIsSuccess, getDisbursementData]);

  useEffect(() => {
    setDueDate(offer?.dueDate);
    setLoanAccountNumber(offer?.loanAccountNumber);
    setLoanAmount(offer?.loanAmount);
    let pf = (parseInt(offer?.loanAmount) * offer?.fees) / 100;
    let pF;
    if (parseInt(pf) % 10 < 4) {
      pF = Math.max(9, Math.floor(pf / 10) * 10 - 1);
    } else {
      pF = Math.max(9, Math.floor((pf + 10) / 10) * 10 - 1);
    }
    setNetAmount(parseInt(offer?.loanAmount) - pF);
  }, [offer]);

  const data = [
    { subTitle: "Loan Amount ", value: "₹" + loanAmount },
    { subTitle: "Net Transfer Amount ", value: "₹" + netAmount },
    { subTitle: "Bank Account Number", value: bankAccountNumber },
    { subTitle: "Due Date", value: dueDate },
    { subTitle: "Loan Account Number", value: loanAccountNumber },
    { subTitle: "Transfer Status", value: status },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title="Money Transfer"
        onLeftIconPress={() => backAction()}
        onRightIconPress={() => {}}
        titleStyle={{ ...FONTS.body3 }}
      />
      <View style={[styles.container, { alignItems: "center" }]}>
        {StatusImage(status)}
        {StatusText(status)}
        {status == "REJECTED" || status == "ERROR" ? null : (
          <DisbursementCard
            data={data}
            title="Loan Details"
            info="Money will be auto debited from your upcoming salary"
            iconName="ticket-percent-outline"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;
