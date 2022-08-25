import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "../../../components/PrimaryButton";
import { styles, ewa, bankform, form } from "../../../styles";

const LoanDetails = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Loan Details"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <View style={ewa.loanCard}>
        <Text style={{ fontWeight: "bold" }}>
          Loan Details{" "}
          <Icon name="information-outline" size={20} color="#FF6700" />
        </Text>
        <Text style={{ marginTop: 10 }}>Loan Amount</Text>
        <Text style={{ marginTop: 10 }}>Processing Fees</Text>
        <Text style={{ marginTop: 10 }}>Net Disbursement Amount</Text>
        <Text style={{ marginTop: 10 }}>Due Date*</Text>
        <Text style={{ marginTop: 10 }}>
          *Money will be deducted from your upcoming salary
        </Text>
      </View>
      <PrimaryButton
        title="My Details are Correct"
        uppercase={false}
        onPress={() => {
          navigation.navigate("EWAEarnedWage");
        }}
      />
    </SafeAreaView>
  );
};

export default LoanDetails;
