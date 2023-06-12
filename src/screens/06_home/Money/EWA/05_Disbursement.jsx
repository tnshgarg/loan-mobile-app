import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Failure from "../../../../assets/animations/Failure";
import Pending from "../../../../assets/animations/Pending";
import Success from "../../../../assets/animations/Success";
import Header from "../../../../components/atoms/Header";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import { strings } from "../../../../helpers/Localization";
import { useGetDisbursementQuery } from "../../../../store/apiSlices/ewaApi";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";

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
        return <Success />;
      case "REJECTED":
        return <Failure />;
      case "FAILURE":
        return <Failure />;
      default:
        return <Pending />;
    }
  };

  const getStatusText = (headline, subheadline) => {
    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.subHeadline}>{subheadline}</Text>
      </View>
    );
  };

  const StatusText = (status) => {
    switch (status) {
      case "SUCCESS":
        return getStatusText(strings.congrats, strings.advanceSalaryCredited);
      case "REJECTED":
        return getStatusText(strings.sorry, strings.cannotProcessSalary);
      case "FAILURE":
        return getStatusText(strings.sorry, strings.cannotProcessSalary);
      default:
        return getStatusText(strings.pending, strings.receiveMoney);
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
      <Header
        title="Money Transfer"
        onLeftIconPress={() => backAction()}
        // progress={100}
      />
      <View style={styles.container}>
        {StatusImage("REJECTED")}
        {StatusText("REJECTED")}
        <DisbursementCard
          data={data}
          title={strings.loanDetails}
          info={strings.moneyAutoDebitedUpcomingSalary}
          iconName="ticket-percent-outline"
          variant={"dark"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;
