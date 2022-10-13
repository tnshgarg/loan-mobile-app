import { AppBar, IconButton } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import { ewa, styles } from "../../../../styles";
import { useSelector } from "react-redux";
import { COLORS } from "../../../../constants/Theme";

const Disbursement = ({route, navigation}) => {
  const {offer} = route.params;
  
  const bankSlice = useSelector((state) => state.bank);

  const [processingFees, setProcessingFees] = useState();
  const [netAmount, setNetDisbursementAmount] = useState();
  const [dueDate, setDueDate] = useState();

  useEffect(() => {
    console.log("disbursement offer: ", offer);
    setProcessingFees(
      Math.round(((offer?.loanAmount * offer?.fees) / 100 + 1) / 10) * 10 - 1
    );
    setNetDisbursementAmount(offer?.netAmount);
    setDueDate(offer?.dueDate);
  }, [offer]);

  useEffect(() => {
    setNetDisbursementAmount(offer?.loanAmount - processingFees);
  }, [processingFees]);

  const data = [
    { subTitle: "Loan Amount ", value: "₹" + offer?.loanAmount },
    {
      subTitle: "Net Disbursement Amount ",
      value: "₹" + netAmount,
    },
    {
      subTitle: "Disbursement Bank Account Number",
      value: bankSlice?.data?.accountNumber,
    },
    { subTitle: "Due Date", value: dueDate },
    { subTitle: "Loan Account Number", value: "" },
    { subTitle: "Disbursement Satus", value: "INPROGRESS" },
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
