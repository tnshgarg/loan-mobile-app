import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Image, View } from "react-native";
import CollapsibleCard from "../../../../components/molecules/CollapsibleCard";
import { ewa, styles } from "../../../../styles";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import { getBackendData } from "../../../../services/employees/employeeServices";
import SVGImgFailure from "../../../../assets/ewa_failure.svg";
import SVGImgSuccess from "../../../../assets/ewa_success.svg";
import SVGImgPending from "../../../../assets/ewa_pending.svg";

const Disbursement = ({ route, navigation }) => {
  const { offer } = route.params;
  const [dueDate, setDueDate] = useState(offer?.dueDate);
  const [loanAmount, setLoanAmount] = useState(offer?.loanAmount);
  const [netAmount, setNetAmount] = useState(offer?.netAmount);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const bankSlice = useSelector((state) => state.bank);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  const [status, setStatus] = useState("");
  const [processingFees, setProcessingFees] = useState("");

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
        return <SVGImgSuccess />;
      case "FAILURE":
        return <SVGImgFailure />;
      default:
        return <SVGImgPending />;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    getBackendData({
      params: { offerId: offer?.offerId, unipeEmployeeId: unipeEmployeeId },
      xpath: "ewa/disbursement",
      token: token,
    })
      .then((response) => {
        console.log("ewaDisbursementFetch response.data: ", response.data);
        if (response.data.status === 200) {
          setLoanAmount(response.data.body.loanAmount);
          setNetAmount(response.data.body.netAmount);
          setBankAccountNumber(response.data.body.bankAccountNumber);
          setDueDate(response.data.body.dueDate);
          setLoanAccountNumber(response.data.body.loanAccountNumber);
          setStatus(response.data.body.status);
          Analytics.trackEvent("Ewa|Disbursement|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        }
      })
      .catch((error) => {
        console.log("ewaDisbursementFetch error: ", error.toString());
        Analytics.trackEvent("Ewa|Disbursement|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  }, []);

  useEffect(() => {
    console.log("disbursement offer: ", offer);
    setProcessingFees(
      Math.round((((offer?.loanAmount * offer?.fees) / 100 + 1) / 10) * 10 - 1)
    );
    setNetAmount(offer?.netAmount);
    setDueDate(offer?.dueDate);
  }, [offer]);

  useEffect(() => {
    setNetAmount(offer?.loanAmount - processingFees);
  }, [processingFees]);

  const data = [
    { subTitle: "Loan Amount ", value: "₹" + loanAmount },
    { subTitle: "Net Transfer Amount ", value: "₹" + netAmount },
    { subTitle: "Bank Account Number", value: bankAccountNumber },
    { subTitle: "Due Date", value: dueDate },
    { subTitle: "Loan Account Number", value: loanAccountNumber },
    { subTitle: "Transfer Satus", value: status },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Money Transfer" onLeftIconPress={() => backAction()} />
      <View style={styles.container}>
        {StatusImage(status)}
        <CollapsibleCard
          data={data}
          title="Loan Details"
          isClosed={false}
          info="Disbursement will be reconciled in your next payroll"
        />
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;
