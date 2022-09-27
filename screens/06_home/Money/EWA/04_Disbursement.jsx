import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import { ewa, styles } from "../../../../styles";
import { useSelector } from "react-redux";

const Disbursement = () => {

  const navigation = useNavigation();
  
  const bankSlice = useSelector((state) => state.bank);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  const data = [
    { subTitle: "Loan Account Number", value: ""},
    { subTitle: "Net Disbursement Amount ", value: "₹" + (ewaLiveSlice.loanAmount - ewaLiveSlice.loanAmount * (ewaLiveSlice.fees / 100))},
    { subTitle: "Disbursement Bank Account No.", value: bankSlice?.data?.accountNumber },
    { subTitle: "Due Date", value: ewaLiveSlice?.dueDate },
  ];
  const icon = () => {
    return <Icon name="information-outline" size={24} color="#FF6700" />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Earned Wages"
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
        TitleIcon={icon}
        isClosed={false}
        info="Money will be deducted from your upcoming salary"
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
