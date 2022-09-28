import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import { ewa, styles } from "../../../../styles";
import { useSelector } from "react-redux";

const Disbursement = () => {

  const navigation = useNavigation();
  
  const bankSlice = useSelector((state) => state.bank);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  
  const [netDisbursementAmount, setNetDisbursementAmount] = useState();
  const [dueDate, setDueDate] = useState();


  useEffect(() => {
    setNetDisbursementAmount(Math.round((ewaLiveSlice?.loanAmount * (1 - (ewaLiveSlice?.fees / 100)) + 1) / 10 ) * 10 - 1);
    setDueDate(ewaLiveSlice?.dueDate);
  }, [ewaLiveSlice]);

  const data = [
    { subTitle: "Net Disbursement Amount ", value: "₹" + netDisbursementAmount },
    { subTitle: "Disbursement Bank Account Number", value: bankSlice?.data?.accountNumber },
    { subTitle: "Due Date", value: dueDate },
    { subTitle: "Loan Account Number", value: ""},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Money Transfer"
        color="#4E46F1"
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
