import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import CheckBox from "@react-native-community/checkbox";
import { styles, checkBox, ewa, bankform } from "../../../../styles";
import { useSelector } from "react-redux";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { ewaAgreementPush } from "../../../../helpers/BackendPush";

const Agreement = () => {

  let DeviceId = 0;
  let DeviceIp = 0;

  getUniqueId().then((id) => {
    DeviceId = id;
  });
  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    DeviceIp = ipv4Address;
  });
  
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const aadhaarSlice = useSelector((state) => state.aadhaar.data);
  const panSlice = useSelector((state) => state.pan);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const bankSlice = useSelector((state) => state.bank);
  const profileData = [
    { subTitle: "Name", value: aadhaarSlice?.name },
    { subTitle: "PAN", value: panSlice?.number },
    { subTitle: "DOB", value: aadhaarSlice?.date_of_birth },
  ];
  const bankData = [
    { subTitle: "Bank Name", value: bankSlice?.data?.bankName },
    { subTitle: "Branch", value: bankSlice?.data?.branchName },
    { subTitle: "Account Number", value: bankSlice?.data?.accountNumber },
    { subTitle: "IFSC", value: bankSlice?.data?.ifsc },
  ];

  const data = [
    { subTitle: "Loan Amount", value: "₹" + ewaLiveSlice?.loanAmount },
    {
      subTitle: "Processing Fees",
      value: "₹" + ewaLiveSlice?.loanAmount * (ewaLiveSlice.fees / 100),
    },
    {
      subTitle: "Net Disbursement Amount ",
      value:
        "₹" +
        (ewaLiveSlice?.loanAmount - ewaLiveSlice?.loanAmount * (ewaLiveSlice?.fees / 100)),
    },
    { subTitle: "Due Date", value: ewaLiveSlice?.dueDate },
  ];

  const employeeId = useSelector((state) => state.auth.id);
  const offerId = useSelector((state) => state.ewaLive.offerId);

  useEffect(() => {
    ewaAgreementPush({
      offerId: offerId,
      unipeEmployeeId: employeeId,
      status: "INPROGRESS",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
    })
    .then((response) => {
      console.log("ewaAgreementPush response.data: ", response.data);
    })
    .catch((error) => {
      console.log("ewaAgreementPush error: ", error);
      Alert.alert("An Error occured", error);
    });
  }, []);

  function handleAgreement() {
    ewaAgreementPush({
      offerId: offerId,
      unipeEmployeeId: employeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
      bankAccountNumber: bankSlice?.data?.accountNumber,
      dueDate: ewaLiveSlice?.dueDate,
      fees: ewaLiveSlice.loanAmount * (ewaLiveSlice.fees / 100),
      loanAmount: ewaLiveSlice?.loanAmount,
    })
    .then((response) => {
      console.log("ewaAgreementPush response.data: ", response.data);
      navigation.navigate("EWA_DISBURSEMENT");
    })
    .catch((error) => {
      console.log("ewaAgreementPush error: ", error);
      Alert.alert("An Error occured", error);
    });
  }

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
              navigation.navigate("EWA_KYC");
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
            handleAgreement();
          }}
          disabled={!confirm || !consent}
        />
        <View style={checkBox.padding}></View>
        <Text style={{ marginLeft: "6%", fontWeight: "300" }}>
          <Text style={bankform.asterisk}>*</Text>
          Annual Percentage Rate @{ewaLiveSlice?.fees}%
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agreement;
