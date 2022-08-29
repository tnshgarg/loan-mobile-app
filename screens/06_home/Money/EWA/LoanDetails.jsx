import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import CheckBox from "@react-native-community/checkbox";
import { styles, checkBox, ewa } from "../../../../styles";
import { useSelector } from "react-redux";
const LoanDetails = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const profileSlice = useSelector((state) => state.profile);
  const panSlice = useSelector((state) => state.pan);
  const bankSlice = useSelector((state) => state.bank);

  const profileData = [
    { subTitle: "Name", value: profileSlice?.name },
    { subTitle: "PAN", value: panSlice?.number },
    { subTitle: "DOB", value: panSlice?.data["date_of_birth"] },
  ];
  const bankData = [
    { subTitle: "Bank Name", value: bankSlice?.bankName },
    { subTitle: "Branch", value: bankSlice?.bankBranch },
    { subTitle: "Account Number", value: bankSlice?.accountNumber },
    { subTitle: "IFSC", value: bankSlice?.ifsc },
  ];

  const data = [
    { subTitle: "Loan Amount", value: "$1,000" },
    { subTitle: "Processing Fees", value: "$10" },
    { subTitle: "Net Disbursement Amount ", value: "$990" },
    { subTitle: "Due Date", value: "23/10/2023" },
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
      <CollapsibleCard
        data={data}
        title="Loan Details"
        TitleIcon={infoIcon}
        isClosed={false}
      />
      <Text style={{ marginLeft: "6%", fontWeight: "300" }}>
        Annual Percentage Rate @xx%
      </Text>
      <CollapsibleCard
        title="Personal Details"
        isClosed={true}
        TitleIcon={profileIcon}
        data={profileData}
      />
      <CollapsibleCard
        title="Bank Details"
        isClosed={true}
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
    </SafeAreaView>
  );
};

export default LoanDetails;
