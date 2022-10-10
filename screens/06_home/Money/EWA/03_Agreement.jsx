import { useState, useEffect } from "react";
import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import CheckBox from "@react-native-community/checkbox";
import { styles, checkBox, ewa } from "../../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { ewaAgreementPush } from "../../../../helpers/BackendPush";
import { addNetDisbursementAmount, addProcessingFees } from "../../../../store/slices/ewaLiveSlice";

const Agreement = () => {

  let DeviceId = 0;
  let DeviceIp = 0;

  getUniqueId().then((id) => {
    DeviceId = id;
  });

  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    DeviceIp = ipv4Address;
  });
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const panSlice = useSelector((state) => state.pan);
  const bankSlice = useSelector((state) => state.bank);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  const [netDisbursementAmount, setNetDisbursementAmount] = useState();
  const [processingFees, setProcessingFees] = useState();

  const [apr, setApr] = useState();

  useEffect(() => {
    setProcessingFees(Math.round(((ewaLiveSlice?.loanAmount * ewaLiveSlice?.fees / 100) + 1) / 10 ) * 10 - 1);
  }, [ewaLiveSlice]);

  useEffect(() => {
    dispatch(addProcessingFees(processingFees));
    setNetDisbursementAmount(ewaLiveSlice?.loanAmount - processingFees);
  }, [processingFees]);

  useEffect(() => {
    dispatch(addNetDisbursementAmount(netDisbursementAmount));
    setApr(APR());
  }, [netDisbursementAmount]);

  const profileData = [
    { subTitle: "Name", value: aadhaarSlice?.data?.name },
    { subTitle: "PAN Number", value: panSlice?.number },
    { subTitle: "Date of Birth", value: aadhaarSlice?.data?.date_of_birth },
  ];

  const bankData = [
    { subTitle: "Bank Name", value: bankSlice?.data?.bankName },
    { subTitle: "Branch", value: bankSlice?.data?.branchName },
    { subTitle: "Account Number", value: bankSlice?.data?.accountNumber },
    { subTitle: "IFSC", value: bankSlice?.data?.ifsc },
  ];

  const APR = () => {
    var today = new Date();
    var dueDateComponents = ewaLiveSlice.dueDate.split("/");
    var dueDate = new Date(dueDateComponents[2], parseInt(dueDateComponents[1])-1, dueDateComponents[0]);
    var timeDiff = dueDate.getTime() - today.getTime();
    var daysDiff = parseInt(timeDiff / (1000 * 3600 * 24));
    var apr = 100*(processingFees/ewaLiveSlice?.loanAmount)*(365/daysDiff);
    return apr.toFixed(2);
  }

  const data = [
    { subTitle: "Loan Amount", value: "₹" + ewaLiveSlice?.loanAmount },
    {
      subTitle: "Processing Fees *",
      value: "₹" + processingFees,
    },
    {
      subTitle: "Net Disbursement Amount *",
      value:
        "₹" + netDisbursementAmount,
    },
    { subTitle: "Due Date", value: ewaLiveSlice?.dueDate },
  ];

  const unipeEmployeeId = useSelector((state) => state.auth.id);

  useEffect(() => {
    ewaAgreementPush({
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
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
    setLoading(true);
    ewaAgreementPush({
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
      bankAccountNumber: bankSlice?.data?.accountNumber,
      dueDate: ewaLiveSlice?.dueDate,
      processingFees: processingFees,
      loanAmount: ewaLiveSlice?.loanAmount,
      netDisbursementAmount: netDisbursementAmount,
    })
    .then((response) => {
      console.log("ewaAgreementPush response.data: ", response.data);
      navigation.navigate("EWA_DISBURSEMENT", {offer: ewaLiveSlice});
      setLoading(false);
    })
    .catch((error) => {
      console.log("ewaAgreementPush error: ", error);
      Alert.alert("An Error occured", error);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Agreement"
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
          isClosed={false}
          // info="Disbursed amount will be adjusted in your next salary."
        />
        <CollapsibleCard
          title="Personal Details"
          isClosed={false}
          data={profileData}
        />
        <CollapsibleCard
          title="Bank Details"
          isClosed={false}
          data={bankData}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <CheckBox
            style={ewa.checkBox}
            tintColors={{ true: "#4E46F1" }}
            value={confirm}
            onValueChange={setConfirm}
          />
          <Text style={ewa.checkBoxText}>I confirm the above details.</Text>
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
          title={loading ? "Booking" : "Finish"}
          uppercase={false}
          color="#2CB77C"
          onPress={() => {
            handleAgreement();
          }}
          disabled={!confirm || !consent || loading}
        />
        <View style={checkBox.padding}></View>
        <Text style={{ marginLeft: "6%", fontSize: 6, marginTop: "25%" }}>
          * Disbursement will be reconciled in your next payroll {"\n"}
          * Annual Percentage Rate @ {apr} %
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agreement;
