import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import CheckBox from "@react-native-community/checkbox";
import { styles, checkBox, ewa } from "../../../../styles";
import { useSelector, useDispatch } from "react-redux";

const Agreement = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const aadhaarSlice = useSelector((state) => state.aadhaar.data);
  const panSlice = useSelector((state) => state.pan);
  const mandateSlice = useSelector((state) => state.ewaMandate);
  const bankSlice = useSelector((state) => state.bank?.data);
  const agreementSlice = useSelector((state) => state.ewaAgreement);
  const configSlice = useSelector((state) => state.ewaConfig);
  const profileData = [
    { subTitle: "Name", value: aadhaarSlice?.name },
    { subTitle: "PAN", value: panSlice?.number},
    { subTitle: "DOB", value: aadhaarSlice?.date_of_birth},
  ];
  const bankData = [
    { subTitle: "Bank Name", value: bankSlice?.bankName },
    { subTitle: "Branch", value: bankSlice?.branchName },
    { subTitle: "Account Number", value: mandateSlice?.accountNumber },
    { subTitle: "IFSC", value: mandateSlice?.ifsc },
  ];

  const data = [
    { subTitle: "Loan Amount", value: "₹" + agreementSlice?.amount},
    { subTitle: "Processing Fees", value: "₹" + agreementSlice?.processingFeeAmount},
    { subTitle: "Net Disbursement Amount ", value: "₹" + agreementSlice?.netDisbursementAmount},
    { subTitle: "Due Date", value: agreementSlice?.dueDate },
  ];
  const infoIcon = () => {
    return <Icon name="information-outline" size={24} color="#FF6700" />;
  };
  const profileIcon = () => {
    return <Icon name="account" size={24} color="#FF6700" />;
  };
  const bankIcon = () => {
    return <Icon name="bank" size={24} color="#FF6700" />;
  };

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
      <ScrollView>
        <CollapsibleCard
          data={data}
          title="Loan Details"
          TitleIcon={infoIcon}
          isClosed={false}
          info="Disbursed amount will be adjusted in your next salary."
        />
        <Text style={{ marginLeft: "6%", fontWeight: "300" }}>
          Annual Percentage Rate @{configSlice?.processingFeeRate || agreementSlice?.processingFeeRate}%
        </Text>
        <CollapsibleCard
          title="Personal Details"
          isClosed={false}
          TitleIcon={profileIcon}
          data={profileData}
        />
        <CollapsibleCard
          title="Bank Details"
          isClosed={false}
          TitleIcon={bankIcon}
          data={bankData}
        />
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <CheckBox
            style={ewa.checkBox}
            tintColors={{ true: "#4E46F1" }}
            value={confirm}
            onValueChange={setConfirm}
          />
          <Text style={ewa.checkBoxText}>I confirm the details above.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            style={ewa.checkBox}
            tintColors={{ true: "#4E46F1" }}
            value={consent}
            onValueChange={setConsent}
          />
          <Text style={ewa.checkBoxText}>
            I agree to the Terms and Conditions.
          </Text>
        </View>
        <PrimaryButton
          title="My Details are Correct"
          uppercase={false}
          onPress={() => {
            navigation.navigate("EWAEarnedWage");
          }}
          disabled={!confirm || !consent}
        />
        <View style={checkBox.padding}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agreement;
