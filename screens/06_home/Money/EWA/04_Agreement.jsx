import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import CheckBox from "@react-native-community/checkbox";
import { styles, checkBox, ewa } from "../../../../styles";
import { useSelector, useDispatch } from "react-redux";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { ewaAgreementPush } from "../../../../helpers/BackendPush";
import { addStatus } from "../../../../store/slices/ewaSlice";

const Agreement = () => {
  let DeviceId = 0;
  getUniqueId().then((id) => {
    DeviceId = id;
  });
  let DeviceIp = 0;
  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    DeviceIp = ipv4Address;
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const aadhaarSlice = useSelector((state) => state.aadhaar.data);
  const panSlice = useSelector((state) => state.pan);
  const ewaSlice = useSelector((state) => state.ewa);
  const bankSlice = useSelector((state) => state.bank?.data);
  const profileData = [
    { subTitle: "Name", value: aadhaarSlice?.name },
    { subTitle: "PAN", value: panSlice?.number },
    { subTitle: "DOB", value: aadhaarSlice?.date_of_birth },
  ];
  const bankData = [
    { subTitle: "Bank Name", value: bankSlice?.bankName },
    { subTitle: "Branch", value: bankSlice?.branchName },
    { subTitle: "Account Number", value: bankSlice?.accountNumber },
    { subTitle: "IFSC", value: bankSlice?.ifsc },
  ];

  const data = [
    { subTitle: "Loan Amount", value: "₹" + ewaSlice?.loanAmount },
    {
      subTitle: "Processing Fees",
      value: "₹" + ewaSlice.loanAmount * (ewaSlice.fees / 100),
    },
    {
      subTitle: "Net Disbursement Amount ",
      value:
        "₹" + (ewaSlice.loanAmount - (ewaSlice.loanAmount * (ewaSlice.fees / 100))),
    },
    { subTitle: "Due Date", value: ewaSlice?.dueDate },
  ];

  const [status, setStatus] = useState(ewaSlice.status.agreement);
  const employeeId = useSelector((state) => state.auth.id);
  useEffect(() => {
    status === "PENDING"
      ? ewaAgreementPush({
          offerId: employeeId, //change to offerID
          unipeEmployeeId: employeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: DeviceIp,
          deviceId: DeviceId,
        })
      : null;
  }, []);

  function handleAgreement() {
    dispatch(addStatus({ type: "agreement", data: "CONFIRMED" }));
    ewaAgreementPush({
      offerId: employeeId, //change to offerID
      unipeEmployeeId: employeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
      bankAccountNumber: bankSlice?.accountNumber,
      dueDate: ewaSlice?.dueDate,
      fees: ewaSlice.loanAmount * (ewaSlice.fees / 100),
      loanAmount: ewaSlice?.loanAmount,
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
            navigation.navigate("EWAEarnedWage");
          }}
          disabled={!confirm || !consent}
        />
        <View style={checkBox.padding}></View>
        <Text style={{ marginLeft: "6%", fontWeight: "300" }}>
          Annual Percentage Rate @
          {ewaSlice?.fees}%
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agreement;
