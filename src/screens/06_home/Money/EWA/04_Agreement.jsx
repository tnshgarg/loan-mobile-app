import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/core";
import Analytics, {InteractionTypes} from "../../../../helpers/analytics/commonAnalytics";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { getUniqueId } from "react-native-device-info";
import Modal from "react-native-modal";
import { NetworkInfo } from "react-native-network-info";
import RenderHtml from "react-native-render-html";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../../components/atoms/Checkbox";
import Header from "../../../../components/atoms/Header";
import LiquiloansTitle from "../../../../components/atoms/LiquiloansTitle";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import { strings } from "../../../../helpers/Localization";
import { useUpdateAgreementMutation } from "../../../../store/apiSlices/ewaApi";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { resetEwaLive } from "../../../../store/slices/ewaLiveSlice";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { useGetKycQuery } from "../../../../store/apiSlices/kycApi";
import { moneyStyles, styles } from "../../../../styles";
import kfs from "../../../../templates/docs/liquiloans/LiquiLoansKFS";
import agreement from "../../../../templates/docs/liquiloans/LiquiLoansLoanAgreement";

const Agreement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isKFSModalVisible, setIsKFSModalVisible] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector(
    (state) =>
      state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId
  );

  const { data: kycData } = useGetKycQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 60 * 60 * 24,
  });
  const { aadhaar, pan, bank, profile } = kycData ?? {};

  console.log({ profile });
  const authSlice = useSelector((state) => state.auth);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const mandateVerifyStatus = useSelector(
    (state) => state.mandate.verifyStatus
  );

  const today = new Date();
  const [updateAgreement] = useUpdateAgreementMutation();

  function ValueEntryAgreement(text) {
    text.data = text.data.replace(
      /\{aadhaarAddress\}/g,
      aadhaar?.data?.address
    );
    text.data = text.data.replace(
      /\{accountNumber\}/g,
      bank?.data?.accountNumber
    );
    text.data = text.data.replace(/\{dueDate\}/g, ewaLiveSlice?.dueDate);
    text.data = text.data.replace(/\{email\}/g, profile?.email);
    text.data = text.data.replace(/\{ifsc\}/g, bank?.data?.ifsc);
    text.data = text.data.replace(
      /\{loanAccountNumber\}/g,
      ewaLiveSlice?.offerId
    );
    text.data = text.data.replace(/\{loanAmount\}/g, ewaLiveSlice?.loanAmount);
    text.data = text.data.replace(/\{mobile\}/g, authSlice?.phoneNumber);
    text.data = text.data.replace(/\{panName\}/g, pan?.data?.name);
    text.data = text.data.replace(
      /\{processingFees\}/g,
      ewaLiveSlice?.processingFees
    );
    text.data = text.data.replace(
      /\{todayDate\}/g,
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
    text.data = text.data.replace(/\{unipeEmployeeId\}/g, unipeEmployeeId);
  }

  function ValueEntryKFS(text) {
    text.data = text.data.replace(/\{loanAmount\}/g, ewaLiveSlice?.loanAmount);
    text.data = text.data.replace(
      /\{disbursedAmount\}/g,
      ewaLiveSlice?.netAmount
    );
    text.data = text.data.replace(/\{APR\}/g, ewaLiveSlice?.apr);
    text.data = text.data.replace(/\{panName\}/g, pan?.data?.name);
    text.data = text.data.replace(
      /\{processingFees\}/g,
      ewaLiveSlice?.processingFees
    );
    text.data = text.data.replace(
      /\{availedDate\}/g,
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
  }

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
    dispatch(addCurrentScreen("EWA_AGREEMENT"));
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

  useEffect(() => {
    if (fetched) {
      setLoading(true);
      let data = {
        offerId: ewaLiveSlice?.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
        campaignId: campaignId,
      };
      updateAgreement(data)
        .then((response) => {
          setLoading(false);
          console.log("ewaAgreementPush response.data: ", response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log("ewaAgreementPush error: ", error.message);
          Alert.alert("An Error occured", error.message);
        });
    }
  }, [fetched]);

  const backAction = () => {
    Analytics.trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      component: "Ewa",
      action: "Agreement",
      status: "Back"
    });
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

  const profileData = [
    { subTitle: "Name", value: aadhaar?.data?.name },
    { subTitle: "PAN Number", value: pan?.number },
    { subTitle: "Date of Birth", value: aadhaar?.data?.date_of_birth },
  ];

  const bankData = [
    { subTitle: "Bank Name", value: bank?.data?.bankName },
    { subTitle: "Branch", value: bank?.data?.branchName },
    { subTitle: "Account Number", value: bank?.data?.accountNumber },
    { subTitle: "IFSC", value: bank?.data?.ifsc },
  ];

  const data = [
    { subTitle: "Loan Amount", value: "₹" + ewaLiveSlice?.loanAmount },
    {
      subTitle: "Processing Fees †",
      value: "₹" + ewaLiveSlice?.processingFees,
    },
    {
      subTitle: "Disbursement Amount *",
      value: "₹" + ewaLiveSlice?.netAmount,
    },
    { subTitle: "Due Date", value: ewaLiveSlice?.dueDate },
  ];

  function handleAgreement() {
    setLoading(true);
    let data = {
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: ipAddress,
      deviceId: deviceId,
      bankAccountNumber: bank?.data?.accountNumber,
      bankName: bank?.data?.bankName,
      dueDate: ewaLiveSlice?.dueDate,
      processingFees: ewaLiveSlice?.processingFees,
      loanAmount: ewaLiveSlice?.loanAmount,
      netAmount: ewaLiveSlice?.netAmount,
      loanAccountNumber: ewaLiveSlice?.offerId,
      employerId: ewaLiveSlice?.employerId,
      employmentId: ewaLiveSlice?.employmentId,
      campaignId: campaignId,
    };

    updateAgreement(data)
      .then((response) => {
        console.log("ewaAgreementPush response.data: ", response.data);
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical([]));
        setLoading(false);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Ewa",
          action: "Agreement",
          status: "Success",
        });
        navigation.navigate("EWA_DISBURSEMENT", { offer: ewaLiveSlice });
      })
      .catch((error) => {
        console.log("ewaAgreementPush error: ", error.message);
        setLoading(false);
        Alert.alert("An Error occured", error.message);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          component: "Ewa",
          action: "Agreement",
          status: "Error",
          error: error.message,
        });
      });
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={"Loan agreement"}
        onLeftIconPress={() => backAction()}
        subHeadline={"Please confirm if these are your details"}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DisbursementCard
            data={data}
            title={strings.loanDetails}
            info={strings.moneyAutoDebitedUpcomingSalary}
            iconName="ticket-percent-outline"
          />

          <DisbursementCard
            data={bankData}
            title={strings.bankDetails}
            iconName="bank"
          />

          <DisbursementCard
            data={profileData}
            title={strings.personalDetails}
            iconName="account-outline"
          />

          <Checkbox
            text={strings.aboveDetails}
            value={consent}
            setValue={setConsent}
            additionalText={strings.termsAndConditions}
            onPress={() => setIsTermsModalVisible(true)}
          />

          <Checkbox
            text={strings.aboveDetails}
            value={consent}
            setValue={setConsent}
            additionalText="KFS"
            onPress={() => setIsKFSModalVisible(true)}
          />

          <PrimaryButton
            title={loading ? "Processing" : "Proceed"}
            disabled={!consent || loading}
            onPress={() => {
              handleAgreement();
            }}
          />
          <LiquiloansTitle title={"an RBI registered NBFC-P2P"} />
          <Text style={moneyStyles.percentageTitle}>
            {strings.apr} {ewaLiveSlice?.apr} %
          </Text>
          <Modal
            isVisible={isTermsModalVisible}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          >
            <Pressable
              onPress={() => setIsTermsModalVisible(false)}
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
                  domVisitors={{ onText: ValueEntryAgreement }}
                />
              </ScrollView>
            </View>
          </Modal>
          <Modal
            isVisible={isKFSModalVisible}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          >
            <Pressable
              onPress={() => setIsKFSModalVisible(false)}
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
                  source={kfs}
                  enableExperimentalMarginCollapsing={true}
                  renderersProps={{
                    img: {
                      enableExperimentalPercentWidth: true,
                    },
                  }}
                  domVisitors={{ onText: ValueEntryKFS }}
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
