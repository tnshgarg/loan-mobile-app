import { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  Text,
  View
} from "react-native";
import { useSelector } from "react-redux";
import Failure from "../../../../assets/animations/Failure";
import Pending from "../../../../assets/animations/Pending";
import Success from "../../../../assets/animations/Success";
import Header from "../../../../components/atoms/Header";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import { useGetDisbursementQuery } from "../../../../store/apiSlices/ewaApi";
import { styles } from "../../../../styles";

const Disbursement = ({ route, navigation }) => {
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
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const StatusImage = (status) => {
    switch (status) {
      case "SUCCESS":
        return <Success />;
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
        return getStatusText(
          "Congratulations",
          "Your advance salary has been credited to your bank account."
        );
      case "FAILURE":
        return getStatusText(
          "Sorry",
          "We cannot process your advance salary at this moment."
        );
      default:
        return getStatusText(
          "Pending",
          "You will receive the money in next 24 banking hours."
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
        console.log(
          "HomeView ewaOffersFetch API error getEwaOffersData.data : ",
          getDisbursementData
        );
      }
    } else if (getDisbursementIsError) {
      console.log(
        "HomeView ewaOffersFetch API error getEwaOffersError.message : ",
        getDisbursementError.message
      );
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
        {StatusImage(status)}
        {StatusText(status)}
        <DisbursementCard
          data={data}
          title="Loan Details"
          info="Money will be auto debited from your upcoming salary"
          iconName="ticket-percent-outline"
          variant={"dark"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;
