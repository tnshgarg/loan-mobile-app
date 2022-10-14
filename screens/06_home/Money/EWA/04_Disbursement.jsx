import { AppBar, IconButton } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import { ewa, styles } from "../../../../styles";
import { useSelector } from "react-redux";
import { COLORS } from "../../../../constants/Theme";
import { getBackendData } from "../../../../services/employees/employeeServices";


const Disbursement = ({route, navigation}) => {
  const {offer} = route.params;
  
  const bankSlice = useSelector((state) => state.bank);
  
  const [loanAmount, setLoanAmount] = useState(offer?.loanAmount);
  const [netAmount, setNetAmount] = useState(offer?.netAmount);
  const [bankAccountNumber, setBankAccountNumber] = useState(bankSlice?.data?.accountNumber);
  const [dueDate, setDueDate] = useState(offer?.dueDate);
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  const [status, setStatus] = useState("");
  
  const [processingFees, setProcessingFees] = useState("");

  useEffect(() => {
    getBackendData({ params: { offerId: offer.offerId }, xpath: "ewa/disbursement" })
      .then((response) => {
        if (response.data.status === 200) {
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
      });
  }, []);

  useEffect(() => {
    console.log("disbursement offer: ", offer);
    setProcessingFees(
      Math.round(((offer?.loanAmount * offer?.fees) / 100 + 1) / 10) * 10 - 1
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
      <AppBar
        title="Money Transfer"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        }
      />
      <Image
        style={ewa.successImg}
        source={require("../../../../assets/animatedsuccess.gif")}
      />
      <CollapsibleCard
        data={data}
        title="Loan Details"
        isClosed={false}
        info="Disbursement will be reconciled in your next payroll"
      />

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
