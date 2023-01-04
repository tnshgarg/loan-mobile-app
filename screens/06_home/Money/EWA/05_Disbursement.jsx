import { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import { styles } from "../../../../styles";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import SVGImgFailure from "../../../../assets/ewa_failure.svg";
import SVGImgSuccess from "../../../../assets/ewa_success.svg";
import SVGImgPending from "../../../../assets/ewa_pending.svg";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import { getDisbursement } from "../../../../queries/ewa/disbursement";

const Disbursement = ({ route, navigation }) => {
  const { offer } = route.params;

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const bankSlice = useSelector((state) => state.bank);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [dueDate, setDueDate] = useState(offer?.dueDate);
  const [fees, setFees] = useState(offer?.fees);
  const [loanAccountNumber, setLoanAccountNumber] = useState(offer?.offerId);
  const [loanAmount, setLoanAmount] = useState(offer?.loanAmount);
  const [netAmount, setNetAmount] = useState(offer?.netAmount);
  const [status, setStatus] = useState(offer?.status);
  

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "DrawerHome",
      params: { screen: "Money", params: { screen: "EWA" } },
    });
    return true;
  };

  const StatusImage = (status) => {
    switch (status) {
      case "SUCCESS":
        return <SVGImgSuccess style={{ alignSelf: "center" }} />;
      case "FAILURE":
        return <SVGImgFailure style={{ alignSelf: "center" }} />;
      default:
        return <SVGImgPending style={{ alignSelf: "center" }} />;
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
          "You will receive the money in next 15 Mins"
        );
      case "FAILURE":
        return getStatusText(
          "Sorry",
          "We cannot process your advance salary at this moment."
        );
      default:
        return getStatusText(
          "Pending",
          "Your advance salary is under process."
        );
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const {
    isSuccess: getDisbursementIsSuccess,
    isError: getDisbursementIsError,
    error: getDisbursementError,
    data: getDisbursementData,
  } = getDisbursement({
    params: { offerId: offer?.offerId, unipeEmployeeId: unipeEmployeeId },
    token: token,
  });

  useEffect(() => {
    if (getDisbursementIsSuccess) {
      if (getDisbursementData?.data?.status === 200) {
        setBankAccountNumber(getDisbursementData?.data?.body?.bankAccountNumber);
        setDueDate(getDisbursementData?.data?.body?.dueDate);
        setLoanAccountNumber(getDisbursementData?.data?.body?.loanAccountNumber);
        setLoanAmount(getDisbursementData?.data?.body?.loanAmount);
        setNetAmount(getDisbursementData?.data?.body?.netAmount);
        setStatus(getDisbursementData?.data?.body?.status);
      } else {
        console.log("HomeView ewaOffersFetch API error getEwaOffersData.data : ", getDisbursementData.data);
      }
    } else if (getDisbursementIsError) {
      console.log("HomeView ewaOffersFetch API error getEwaOffersError.message : ", getDisbursementError.message);
    }
  }, [getDisbursementIsSuccess, getDisbursementData]);
  
  useEffect(() => {
    var pf = (parseInt(loanAmount) * fees)/100;
    var pF;
    if (parseInt(pf)%10<4) {
      pF = Math.max(9, (Math.floor((pf/10))*10) -1);
    } else {
      pF = Math.max(9, (Math.floor(((pf+10)/10))*10) -1);
    }
    setNetAmount(parseInt(loanAmount) - pF);
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
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Disbursement;
