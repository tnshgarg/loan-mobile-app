import { useNavigation } from "@react-navigation/core";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../../components/atoms/Checkbox";
import Loading from "../../../../components/atoms/Loading";
import LoanProviderLogo from "../../../../components/atoms/LoanProviderLogo";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import CmsWebView from "../../../../components/cms/CmsWebView";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { getStringDate } from "../../../../helpers/DateFunctions";
import { strings } from "../../../../helpers/Localization";
import Analytics, {
  InteractionTypes,
  trackEvent,
} from "../../../../helpers/analytics/commonAnalytics";
import { KYC_POLLING_DURATION } from "../../../../services/constants";
import { useGetCmsGroupQuery } from "../../../../store/apiSlices/cmsApi";
import { useUpdateAgreementMutation } from "../../../../store/apiSlices/ewaApi";
import { useGetKycQuery } from "../../../../store/apiSlices/kycApi";
import { useGetMandateQuery } from "../../../../store/apiSlices/mandateApi";
import { resetEwaHistorical } from "../../../../store/slices/ewaHistoricalSlice";
import { resetEwaLive } from "../../../../store/slices/ewaLiveSlice";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { moneyStyles, styles } from "../../../../styles";

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
    pollingInterval: KYC_POLLING_DURATION,
  });
  const { aadhaar, pan, bank, profile } = kycData ?? {};

  console.log({ profile });
  const authSlice = useSelector((state) => state.auth);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const {
    data: mandateData,
    error,
    isLoading,
  } = useGetMandateQuery(unipeEmployeeId, {
    pollingInterval: 1000 * 10,
  });
  const mandateVerifyStatus = mandateData?.verifyStatus;
  const provider = ewaLiveSlice?.provider || "liquiloans";
  const {
    data: loanProviderData,
    isLoading: loanProviderDataLoading,
    error: loanProviderDataError,
    refetch: loanProviderDataRefetch,
  } = useGetCmsGroupQuery({
    group: `loan_provider_${provider}`,
    language: "en",
  });

  const today = new Date();
  const [updateAgreement] = useUpdateAgreementMutation();

  const ValueEntryAgreement = (text) => {
    text = text["html"];
    text = text.replaceAll(/\{aadhaarAddress\}/g, aadhaar?.data?.address);
    text = text.replace(/\{accountNumber\}/g, bank?.data?.accountNumber);
    text = text.replace(/\{dueDate\}/g, ewaLiveSlice?.dueDate);
    text = text.replace(/\{dueDate\}/g, getStringDate(ewaLiveSlice?.dueDate));
    text = text.replace(/\{email\}/g, profile?.email);
    text = text.replace(/\{ifsc\}/g, bank?.data?.ifsc);
    text = text.replace(/\{loanAccountNumber\}/g, ewaLiveSlice?.offerId);
    text = text.replace(/\{loanAmount\}/g, ewaLiveSlice?.loanAmount);
    text = text.replace(/\{mobile\}/g, authSlice?.phoneNumber);
    text = text.replace(/\{panName\}/g, pan?.data?.name);
    text = text.replace(/\{processingFees\}/g, ewaLiveSlice?.processingFees);
    text = text.replace(
      /\{todayDate\}/g,
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
    text = text.replace(/\{unipeEmployeeId\}/g, unipeEmployeeId);
    text = text.replace(/\{panNumber\}/g, pan?.number);
    text = text.replace(/\{aadhaarNumber\}/g, aadhaar?.number);
    text = text.replace(
      /\{gender\}/g,
      ewaLiveSlice?.loanApplicationInfo?.gender
    );
    text = text.replace(/\{maritalStatus\}/g, profile?.maritalStatus);
    text = text.replace(/\{DOB\}/g, aadhaar?.data?.date_of_birth);
    text = text.replace(/\{bankName\}/g, bank?.data?.bankName);
    text = text.replace(/\{branchName\}/g, bank?.data?.branchName);
    text = text.replace(/\{limitAmount\}/g, ewaLiveSlice?.limitAmount);
    text = text.replace(
      /\{employerName\}/g,
      ewaLiveSlice?.loanApplicationInfo?.companyName
    );
    text = text.replace(
      /\{designation\}/g,
      ewaLiveSlice?.loanApplicationInfo?.designation
    );
    text = text.replace(
      /\{employerAddress\}/g,
      ewaLiveSlice?.loanApplicationInfo?.employerStreet
    );
    text = text.replace(
      /\{employerPincode\}/g,
      ewaLiveSlice?.loanApplicationInfo?.employerPincode
    );
    text = text.replace(
      /\{employerState\}/g,
      ewaLiveSlice?.loanApplicationInfo?.employerState
    );
    text = text.replace(/\{address\}/g, aadhaar?.data?.address);
    text = text.replace(/\{pincode\}/g, aadhaar?.data?.pincode);
    text = text.replace(/\{state\}/g, aadhaar?.data?.state);
    text = text.replace(/\{district\}/g, aadhaar?.data?.district);
    text = text.replace(/\{house\}/g, aadhaar?.data?.house);
    text = text.replace(
      /\{monthlyIncome\}/g,
      ewaLiveSlice?.loanApplicationInfo?.aCTC / 12
    );
    return { html: text };
  };

  const ValueEntryKFS = (text) => {
    text = text["html"];
    text = text.replace(/\{loanAmount\}/g, ewaLiveSlice?.loanAmount);
    text = text.replace(/\{disbursedAmount\}/g, ewaLiveSlice?.netAmount);
    text = text.replace(/\{APR\}/g, ewaLiveSlice?.apr);
    text = text.replace(/\{panNumber\}/g, pan?.number);
    text = text.replace(/\{panName\}/g, pan?.data?.name);
    text = text.replace(/\{processingFees\}/g, ewaLiveSlice?.processingFees);
    text = text.replace(
      /\{availedDate\}/g,
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
    return { html: text };
  };

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
    dispatch(addCurrentScreen("EWA_AGREEMENT"));
    loanProviderDataRefetch();
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
      screen: "loanAgreement",
      action: "BACK",
    });
    if (mandateVerifyStatus != "SUCCESS") {
      navigation.navigate("EWA_MANDATE");
    } else {
      navigation.navigate("EWA_KYC");
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const profileData = [
    { subTitle: strings.name, value: aadhaar?.data?.name },
    { subTitle: strings.panNumber, value: pan?.number },
    { subTitle: strings.dateOfBirth, value: aadhaar?.data?.date_of_birth },
  ];

  const bankData = [
    { subTitle: strings.bankName, value: bank?.data?.bankName },
    { subTitle: strings.branchName, value: bank?.data?.branchName },
    { subTitle: strings.bankAccountNumber, value: bank?.data?.accountNumber },
    { subTitle: strings.ifscCode, value: bank?.data?.ifsc },
  ];

  const data = [
    { subTitle: strings.loanAmount, value: "₹" + ewaLiveSlice?.loanAmount },
    {
      subTitle: strings.processingFees,
      value: "₹" + ewaLiveSlice?.processingFees,
    },
    {
      subTitle: strings.disAmount,
      value: "₹" + ewaLiveSlice?.netAmount,
    },
    { subTitle: strings.dueDate, value: ewaLiveSlice?.dueDate },
  ];

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "loanAgreement",
      action: "START",
    });
  }, []);

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
          screen: "loanAgreement",
          action: "SUCCESS",
        });
        navigation.navigate("EWA_DISBURSEMENT", {
          offer: ewaLiveSlice,
          enableFeedback: true,
        });
      })
      .catch((error) => {
        console.log("ewaAgreementPush error: ", error.message);
        setLoading(false);
        Alert.alert("An Error occured", error.message);
        Analytics.trackEvent({
          interaction: InteractionTypes.BUTTON_PRESS,
          screen: "loanAgreement",
          action: "ERROR",
          error: error.message,
        });
      });
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={strings.loanAgreement}
        onLeftIconPress={() => backAction()}
        subHeadline={strings.confirmIfTheseDetails}
      />
      {loading || loanProviderDataLoading ? (
        <Loading isLoading={loading} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <DisbursementCard
              data={data}
              title={strings.loanDetails}
              info={strings.moneyAutoDebitedUpcomingSalary}
            />

            <DisbursementCard data={bankData} title={strings.bankDetails} />

            <DisbursementCard
              data={profileData}
              title={strings.personalDetails}
            />

            <Checkbox
              conatinerStyle={{ marginTop: "5%" }}
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
              onPress={() => {
                trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  screen: "loanAgreement",
                  action: "AGREE",
                });
                setIsKFSModalVisible(true);
              }}
            />

            <PrimaryButton
              title={loading ? strings.processing : strings.proceed}
              disabled={!consent || loading}
              onPress={() => {
                trackEvent({
                  interaction: InteractionTypes.BUTTON_PRESS,
                  screen: "loanAgreement",
                  action: "CONTINUE",
                });
                handleAgreement();
              }}
            />
            <LoanProviderLogo
              title={loanProviderData?.title}
              url={loanProviderData?.logo || ""}
            />

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
                <CmsWebView
                  source={
                    ValueEntryAgreement(loanProviderData?.agreement) || {
                      html: "<h1> Please Reopen to see</h1>",
                    }
                  }
                />
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
                <CmsWebView
                  source={
                    ValueEntryKFS(loanProviderData?.kfs) || {
                      html: "<h1> Please Reopen to see</h1>",
                    }
                  }
                />
              </View>
            </Modal>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Agreement;
