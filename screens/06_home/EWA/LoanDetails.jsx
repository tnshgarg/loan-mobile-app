import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../components/CollapsibleCard";
import PrimaryButton from "../../../components/PrimaryButton";
import CheckBox from "@react-native-community/checkbox";
import { styles, checkBox } from "../../../styles";
const LoanDetails = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);

  const data = [
    { subTitle: "Loan Amount", value: "$1,000" },
    { subTitle: "Processing Fees", value: "$10" },
    { subTitle: "Net Disbursement Amount ", value: "$990" },
    { subTitle: "Due Date", value: "23/10/2023" },
  ];

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
      <CollapsibleCard data={data} title="Loan Details" />
      <Text style={{ marginLeft: "6%", fontWeight: "300" }}>
        Annual Percentage Rate @xx%
      </Text>
      <View style={{ flexDirection: "row" }}>
        <CheckBox
          style={checkBox.checkBox}
          tintColors={{ true: "#4E46F1" }}
          value={confirm}
          onValueChange={setConfirm}
        />
        <Text style={checkBox.checkBoxText}>I confirm the details above.</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <CheckBox
          style={checkBox.checkBox}
          tintColors={{ true: "#4E46F1" }}
          value={consent}
          onValueChange={setConsent}
        />
        <Text style={checkBox.checkBoxText}>
          I agree to the Terms and Conditions.
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
