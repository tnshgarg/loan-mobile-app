import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { ewa, styles } from "../../../../styles";

const Disbursement = ({ route, navigation }) => {
  const { offer } = route.params;

  const bankSlice = useSelector((state) => state.bank);

  const [loanAmount, setLoanAmount] = useState(offer?.loanAmount);
  const [netAmount, setNetAmount] = useState(offer?.netAmount);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [dueDate, setDueDate] = useState(offer?.dueDate);
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  const [status, setStatus] = useState("");

  const [processingFees, setProcessingFees] = useState("");

  useEffect(() => {
    getBackendData({
      params: { offerId: offer.offerId },
      xpath: "ewa/disbursement",
    })
      .then((response) => {
        if (response.data.status === 200) {
          Analytics.trackEvent("Ewa|Disbursement|Success", {
            userId: unipeEmployeeId,
          });
          console.log("ewaDisbursementFetch response.data: ", response.data);
          setLoanAmount(response.data.body.loanAmount);
          setNetAmount(response.data.body.netAmount);
          setBankAccountNumber(response.data.body.bankAccountNumber);
          setDueDate(response.data.body.dueDate);
          setLoanAccountNumber(response.data.body.loanAccountNumber);
          setStatus(response.data.body.status);
        }
      })
      .catch((error) => {
        console.log("ewaDisbursementFetch error: ", error);
        Analytics.trackEvent("Ewa|Disbursement|Error", {
          userId: unipeEmployeeId,
          error: error,
        });
      });
  }, []);

  useEffect(() => {
    console.log("disbursement offer: ", offer);
    setProcessingFees(
      Math.round(((((offer?.loanAmount * offer?.fees) / 100 + 1) / 10) * 10) - 1)
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
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="Money Transfer"
        onLeftIconPress={() => navigation.navigate("Home")}
      />
      <Image
        style={ewa.successImg}
        source={require("../../../../assets/animatedsuccess.gif")}
      />
      <View style={styles.container}>
        <CollapsibleCard
          data={data}
          title="Loan Details"
          isClosed={false}
          info="Disbursement will be reconciled in your next payroll"
        />
      </View>

      {/* 
      // checkout flow
      <PrimaryButton
        title="Thank You"
        uppercase={false}
        onPress={() => {
          navigation.navigate("Home");
        }}
      /> */}
    </SafeAreaView>
  );
};

export default Disbursement;
