import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import CollapsibleCard from "../../../../components/CollapsibleCard";
import PrimaryButton from "../../../../components/PrimaryButton";
import { ewaAgreementPush } from "../../../../helpers/BackendPush";
import {
  addNetAmount,
  addProcessingFees,
  resetEwaLive
} from "../../../../store/slices/ewaLiveSlice";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { checkBox, ewa, styles } from "../../../../styles";
import Modal from "react-native-modal";
import { AntDesign } from "react-native-vector-icons";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import agreement from "../../../../templates/docs/LiquidLoansLoanAgreement";
import { COLORS } from "../../../../constants/Theme";
import Header from "../../../../components/atoms/Header";

const Agreement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [confirm, setConfirm] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const bankSlice = useSelector((state) => state.bank);
  const panSlice = useSelector((state) => state.pan);
  const profileSlice = useSelector((state) => state.profile);
  const authSlice = useSelector((state) => state.auth);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);

  const [netAmount, setNetAmount] = useState();
  const [processingFees, setProcessingFees] = useState(
    useSelector((state) => state.ewaLive.processingFees)
  );
  const [apr, setApr] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [loanAccountNumber, setLoanAccountNumber] = useState("LQLXXXXX");

  const today = new Date();

  function ValueEntry(text) {
    text.data = text.data.replace(
      /\{todayDate\}/g,
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
    text.data = text.data.replace(/\{panName\}/g, panSlice?.data?.name);
    text.data = text.data.replace(
      /\{aadhaarAddress\}/g,
      aadhaarSlice?.data?.address
    );
    text.data = text.data.replace(/\{email\}/g, profileSlice?.email);
    text.data = text.data.replace(/\{mobile\}/g, authSlice?.phoneNumber);
    text.data = text.data.replace(/\{loanAccountNumber\}/g, loanAccountNumber); // TODO: Generate LAN number
    text.data = text.data.replace(/\{loanAmount\}/g, ewaLiveSlice?.loanAmount);
    text.data = text.data.replace(/\{processingFees\}/g, processingFees);
    text.data = text.data.replace(
      /\{accountNumber\}/g,
      bankSlice?.data?.accountNumber
    );
    text.data = text.data.replace(/\{ifsc\}/g, bankSlice?.data?.ifsc);
  }

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

  useEffect(() => {
    setProcessingFees(
      Math.round(((((ewaLiveSlice?.loanAmount * ewaLiveSlice?.fees) / 100) + 1) / 10) * 10) - 1);
  }, [ewaLiveSlice]);

  useEffect(() => {
    dispatch(addProcessingFees(processingFees));
    setNetAmount(ewaLiveSlice?.loanAmount - processingFees);
  }, [processingFees]);

  useEffect(() => {
    dispatch(addNetAmount(netAmount));
    setApr(APR());
  }, [netAmount]);

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
    var dueDate = new Date(
      dueDateComponents[2],
      parseInt(dueDateComponents[1]) - 1,
      dueDateComponents[0]
    );
    var timeDiff = dueDate.getTime() - today.getTime();
    var daysDiff = parseInt(timeDiff / (1000 * 3600 * 24));
    var apr =
      100 * (processingFees / ewaLiveSlice?.loanAmount) * (365 / daysDiff);
    return apr.toFixed(2);
  };

  const data = [
    { subTitle: "Loan Amount", value: "₹" + ewaLiveSlice?.loanAmount },
    {
      subTitle: "Processing Fees *",
      value: "₹" + processingFees,
    },
    {
      subTitle: "Net Disbursement Amount *",
      value: "₹" + netAmount,
    },
    { subTitle: "Due Date", value: ewaLiveSlice?.dueDate },
  ];

  const unipeEmployeeId = useSelector((state) => state.auth.id);

  useEffect(() => {
    if (fetched) {
      ewaAgreementPush({
        offerId: ewaLiveSlice?.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
      })
        .then((response) => {
          console.log("ewaAgreementPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaAgreementPush error: ", error);
          Alert.alert("An Error occured", error);
        });
    }
  }, [fetched]);

  function handleAgreement() {
    setLoading(true);
    ewaAgreementPush({
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: ipAddress,
      deviceId: deviceId,
      bankAccountNumber: bankSlice?.data?.accountNumber,
      dueDate: ewaLiveSlice?.dueDate,
      processingFees: processingFees,
      loanAmount: ewaLiveSlice?.loanAmount,
      netAmount: netAmount,
      loanAccountNumber: loanAccountNumber,
    })
      .then((response) => {
        console.log("ewaAgreementPush response.data: ", response.data);
        navigation.navigate("EWA_DISBURSEMENT", { offer: ewaLiveSlice });
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical([]));
        setLoading(false);
      })
      .catch((error) => {
        console.log("ewaAgreementPush error: ", error);
        Alert.alert("An Error occured", error);
      });
  }

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header title="Agreement" onLeftIconPress={() => navigation.goBack()} />
      <ScrollView>
      <View style={styles.container}>
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
            tintColors={{ true: COLORS.primary }}
            value={confirm}
            onValueChange={setConfirm}
          />
          <Text style={ewa.checkBoxText}>I confirm the above details.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            style={ewa.checkBox}
            tintColors={{ true: COLORS.primary }}
            value={consent}
            onValueChange={setConsent}
          />
          <Text style={ewa.checkBoxText}>
            I agree to the{" "}
            <Text
              style={styles.termsText}
              onPress={() => setIsModalVisible(true)}
            >
              Terms and Conditions
            </Text>
            .
          </Text>
        </View>
        <PrimaryButton
          title={loading ? "Booking" : "Finish"}
          onPress={() => {
            handleAgreement();
          }}
          disabled={!confirm || !consent || loading}
        />
        <View style={checkBox.padding}></View>
        <Text style={{ marginLeft: "6%", fontSize: 6, marginTop: "25%" }}>
          * Disbursement will be reconciled in your next payroll {"\n"}* Annual
          Percentage Rate @ {apr} %
        </Text>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Pressable
          onPress={() => setIsModalVisible(false)}
          style={{
            position: "absolute",
            top: 30,
            right: 50,
            zIndex: 999,
          }}
        >
          <AntDesign name="closesquareo" size={24} color="black" />
        </Pressable>
        <View
          style={{
            height: Dimensions.get("window").height - 100,
            width: Dimensions.get("window").width - 40,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <ScrollView style={{ padding: "5%" }}>
            <RenderHtml
              contentWidth={width}
              source={agreement}
              enableExperimentalMarginCollapsing={true}
              renderersProps={{
                img: {
                  enableExperimentalPercentWidth: true,
                },
              }}
              domVisitors={{ onText: ValueEntry }}
            />
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Agreement;
