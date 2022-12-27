import { useNavigation } from "@react-navigation/core";
import CheckBox from "@react-native-community/checkbox";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { getUniqueId } from "react-native-device-info";
import Modal from "react-native-modal";
import { NetworkInfo } from "react-native-network-info";
import RenderHtml from "react-native-render-html";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { COLORS } from "../../../../constants/Theme";
import { ewaAgreementPush } from "../../../../helpers/BackendPush";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import {
  addNetAmount,
  addProcessingFees,
  resetEwaLive,
} from "../../../../store/slices/ewaLiveSlice";
import { checkBox, ewa, styles } from "../../../../styles";
import agreement from "../../../../templates/docs/LiquiLoansLoanAgreement";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";

const Agreement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector((state) => state.auth.campaignId);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const bankSlice = useSelector((state) => state.bank);
  const panSlice = useSelector((state) => state.pan);
  const profileSlice = useSelector((state) => state.profile);
  const authSlice = useSelector((state) => state.auth);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const mandateVerifyStatus = useSelector(
    (state) => state.mandate.verifyStatus
  );
  const [netAmount, setNetAmount] = useState();
  const [processingFees, setProcessingFees] = useState(
    useSelector((state) => state.ewaLive.processingFees)
  );
  const [apr, setApr] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const today = new Date();

  function ValueEntry(text) {
    text.data = text.data.replace(
      /\{aadhaarAddress\}/g,
      aadhaarSlice?.data?.address
    );
    text.data = text.data.replace(
      /\{accountNumber\}/g,
      bankSlice?.data?.accountNumber
    );
    text.data = text.data.replace(/\{email\}/g, profileSlice?.email);
    text.data = text.data.replace(/\{ifsc\}/g, bankSlice?.data?.ifsc);
    text.data = text.data.replace(
      /\{loanAccountNumber\}/g,
      ewaLiveSlice?.offerId
    );
    text.data = text.data.replace(/\{loanAmount\}/g, ewaLiveSlice?.loanAmount);
    text.data = text.data.replace(/\{mobile\}/g, authSlice?.phoneNumber);
    text.data = text.data.replace(/\{panName\}/g, panSlice?.data?.name);
    text.data = text.data.replace(/\{processingFees\}/g, processingFees);
    text.data = text.data.replace(
      /\{todayDate\}/g,
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
    text.data = text.data.replace(/\{unipeEmployeeId\}/g, unipeEmployeeId);
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

  const backAction = () => {
    if (mandateVerifyStatus === "SUCCESS") {
      navigation.navigate("EWA_KYC");
    } else {
      navigation.navigate("EWA_MANDATE");
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    setProcessingFees(
      Math.round(
        (((ewaLiveSlice?.loanAmount * ewaLiveSlice?.fees) / 100 + 1) / 10) *
          10 -
          1
      )
    );
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
    console.log("APR: ", apr, daysDiff, apr.toFixed(2));
    return apr.toFixed(2);
  };

  const data = [
    { subTitle: "Loan Amount", value: "₹" + ewaLiveSlice?.loanAmount },
    {
      subTitle: "Processing Fees †",
      value: "₹" + processingFees,
    },
    {
      subTitle: "Disbursement Amount *",
      value: "₹" + netAmount,
    },
    { subTitle: "Due Date", value: ewaLiveSlice?.dueDate },
  ];

  useEffect(() => {
    if (fetched) {
      ewaAgreementPush({
        data: {
          offerId: ewaLiveSlice?.offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          campaignId: campaignId,
        },
        token: token,
      })
        .then((response) => {
          console.log("ewaAgreementPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaAgreementPush error: ", error.toString());
          Alert.alert("An Error occured", error.toString());
        });
    }
  }, [fetched]);

  function handleAgreement() {
    setLoading(true);
    ewaAgreementPush({
      data: {
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
        loanAccountNumber: ewaLiveSlice?.offerId,
        employerId: ewaLiveSlice?.employerId,
        employmentId: ewaLiveSlice?.employmentId,
        campaignId: campaignId,
      },
      token: token,
    })
      .then((response) => {
        console.log("ewaAgreementPush response.data: ", response.data);
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical([]));
        setLoading(false);
        Analytics.trackEvent("Ewa|Agreement|Success", {
          unipeEmployeeId: unipeEmployeeId,
        });
        navigation.navigate("EWA_DISBURSEMENT", { offer: ewaLiveSlice });
      })
      .catch((error) => {
        console.log("ewaAgreementPush error: ", error.toString());
        setLoading(false);
        Alert.alert("An Error occured", error.toString());
        Analytics.trackEvent("Ewa|Agreement|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Agreement"
        onLeftIconPress={() => backAction()}
        progress={80}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DisbursementCard
            data={data}
            title="Loan Details"
            info="*Money will be auto debited from your upcoming salary"
            iconName="cash"
          />

          <DisbursementCard
            data={bankData}
            title="Bank Details"
            iconName="bank"
          />

          <DisbursementCard
            data={profileData}
            title="Personal Details"
            iconName="account-outline"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <CheckBox
              style={ewa.checkBox}
              tintColors={{ true: COLORS.primary }}
              value={consent}
              onValueChange={setConsent}
            />
            <Text style={ewa.checkBoxText}>
              I confirm the above details and agree to{" "}
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
            disabled={!consent}
            loading={loading}
            onPress={() => {
              handleAgreement();
            }}
          />
          <View style={checkBox.padding}></View>
          <Text style={{ fontSize: 6, marginTop: "5%" }}>
            † Annual Percentage Rate @ {apr} %
          </Text>

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agreement;
