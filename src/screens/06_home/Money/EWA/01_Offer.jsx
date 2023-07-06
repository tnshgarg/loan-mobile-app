import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import TermsAndPrivacyModal from "../../../../components/molecules/TermsAndPrivacyModal";
import SliderCard from "../../../../components/organisms/SliderCard";
import { strings } from "../../../../helpers/Localization";
import Analytics, {
  InteractionTypes,
  setSessionValue,
} from "../../../../helpers/analytics/commonAnalytics";
import {
  addAPR,
  addLoanAmount,
  addNetAmount,
  addProcessingFees,
} from "../../../../store/slices/ewaLiveSlice";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { styles } from "../../../../styles";
import TnC from "../../../../templates/docs/EWATnC.js";

import Checkbox from "../../../../components/atoms/Checkbox";
import LogoHeaderBack from "../../../../components/molecules/LogoHeaderBack";
import { navigate } from "../../../../navigators/RootNavigation";
import { KYC_POLLING_DURATION } from "../../../../services/constants";
import { useUpdateOfferMutation } from "../../../../store/apiSlices/ewaApi";
import { useGetKycQuery } from "../../../../store/apiSlices/kycApi";

const Offer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [fetched, setFetched] = useState(false);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [validAmount, setValidAmount] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const onboarded = useSelector((state) => state.auth.onboarded);
  const campaignId = useSelector(
    (state) =>
      state.campaign.ewaCampaignId || state.campaign.onboardingCampaignId
  );

  const { data: kycData, refetch: refetchKycData } = useGetKycQuery(
    unipeEmployeeId,
    {
      pollingInterval: KYC_POLLING_DURATION,
    }
  );
  const { aadhaar, pan, bank, profile } = kycData ?? {};
  console.log({ kycData });

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const fees = useSelector((state) => state.ewaLive.fees);
  const [loanAmount, setLoanAmount] = useState(ewaLiveSlice?.eligibleAmount);
  const [processingFees, setProcessingFees] = useState(
    ewaLiveSlice?.processingFees
  );
  const [updateOffer] = useUpdateOfferMutation();
  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
    dispatch(addCurrentScreen("EWA_Offer"));
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

  const backAction = () => {
    trackEvent({
      interaction: InteractionTypes.BUTTON_PRESS,
      screen: "amountSelection",
      action: "BACK",
    });
    navigate("Money", { screen: "EWA" });
    return true;
  };

  useEffect(() => {
    setSessionValue("flow", "ewa");
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    trackEvent({
      interaction: InteractionTypes.SCREEN_OPEN,
      screen: "amountSelection",
      action: "START",
    });
  }, []);

  useEffect(() => {
    setUpdating(true);
    if (parseInt(loanAmount) <= ewaLiveSlice.eligibleAmount) {
      if (parseInt(loanAmount) >= 1000) {
        setValidAmount(true);
        dispatch(addLoanAmount(parseInt(loanAmount)));
      } else {
        setValidAmount(false);
      }
    } else {
      setValidAmount(false);
    }
    console.log("validAmount, updating: ", validAmount, updating);
  }, [loanAmount]);

  useEffect(() => {
    let pF = Math.ceil((parseInt(loanAmount) * fees) / 100);
    setProcessingFees(pF);
    dispatch(addProcessingFees(pF));
    dispatch(addNetAmount(parseInt(loanAmount) - pF));
    dispatch(addAPR(APR(processingFees, loanAmount)));
    setUpdating(false);
  }, [loanAmount, processingFees]);

  const APR = (processingFees, loanAmount) => {
    let today = new Date();
    let dueDateComponents = ewaLiveSlice.dueDate.split("/");
    let dueDate = new Date(
      dueDateComponents[2],
      parseInt(dueDateComponents[1]) - 1,
      dueDateComponents[0]
    );
    console.log(`dueDate, today: ${dueDate}, ${today}`);
    let timeDiff = dueDate.getTime() - today.getTime();
    let daysDiff = parseInt(timeDiff / (1000 * 3600 * 24)) + 1;
    let apr = 100 * (processingFees / parseInt(loanAmount)) * (365 / daysDiff);
    console.log(
      "processingFees, loanAmount, daysDiff, APR: ",
      processingFees,
      loanAmount,
      daysDiff,
      apr
    );
    return apr.toFixed(2);
  };

  const handleConditionalNav = () => {
    refetchKycData()
      .then((res) => {
        console.log(
          profile?.profileComplete,
          aadhaar?.verifyStatus,
          pan?.verifyStatus,
          bank?.verifyStatus,
          onboarded
        );
        if (!profile?.profileComplete) {
          navigation.navigate("EWA_KYC_STACK", { screen: "ProfileForm" });
        } else if (aadhaar.verifyStatus === "INPROGRESS_OTP") {
          navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarVerify" });
        } else if (aadhaar.verifyStatus === "INPROGRESS_CONFIRMATION") {
          navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarConfirm" });
        } else if (aadhaar.verifyStatus != "SUCCESS") {
          navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarForm" });
        } else if (pan.verifyStatus === "INPROGRESS_CONFIRMATION") {
          navigation.navigate("EWA_KYC_STACK", { screen: "PanConfirm" });
        } else if (pan.verifyStatus != "SUCCESS") {
          navigation.navigate("EWA_KYC_STACK", { screen: "PanForm" });
        } else if (bank.verifyStatus === "INPROGRESS_CONFIRMATION") {
          navigation.navigate("EWA_KYC_STACK", { screen: "BankConfirm" });
        } else if (bank.verifyStatus != "SUCCESS") {
          navigation.navigate("EWA_KYC_STACK", { screen: "BankForm" });
        } else if (onboarded) {
          //TODO: onboarded logic

          navigation.navigate("EWA_KYC");
        }
      })
      .catch((err) => console.log(err));
  };

  function handleAmount() {
    setLoading(true);
    if (validAmount && fetched) {
      let data = {
        offerId: ewaLiveSlice.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "CONFIRMED",
        timestamp: Date.now(),
        // ipAddress: ipAddress,
        deviceId: deviceId,
        loanAmount: parseInt(loanAmount),
        campaignId: campaignId,
      };
      updateOffer(data)
        .then((response) => {
          console.log("updateOfferMutateAsync response.data: ", response.data);
          setLoading(false);
          handleConditionalNav();
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "amountSelection",
            action: "SUCCESS",
          });
        })
        .catch((error) => {
          console.log("updateOfferMutateAsync error: ", error.message);
          setLoading(false);
          Alert.alert("An Error occured", error.message);
          Analytics.trackEvent({
            interaction: InteractionTypes.BUTTON_PRESS,
            screen: "amountSelection",
            action: "ERROR",
            error: error.message,
          });
        });
    }
  }

  return (
    <SafeAreaView
      style={[styles.safeContainer, { backgroundColor: "#f3f6f7" }]}
    >
      <LogoHeaderBack
        title={strings.onDemandSalary}
        onLeftIconPress={() => backAction()}
        progress={25}
        subHeadline={strings.selectAmount}
      />
      <View style={[styles.container, { backgroundColor: null }]}>
        <SliderCard
          // info={"Zero Interest charges, Nominal Processing Fees"}
          iconName="brightness-percent"
          amount={loanAmount}
          setAmount={(val) => {
            trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "amountSelection",
              action: "SELECT",
            });
            setLoanAmount(val);
          }}
          eligibleAmount={ewaLiveSlice.eligibleAmount}
          accountNumber={bank?.data?.accountNumber}
          bankName={bank?.data?.bankName}
        />
        <View style={{ flex: 1 }} />

        <Checkbox
          text={strings.iAgree}
          value={consent}
          setValue={setConsent}
          additionalText={strings.termsAndConditions}
          onPress={() => {
            trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "amountSelection",
              action: "AGREE",
            });
            setIsTermsOfUseModalVisible(true);
          }}
        />

        <PrimaryButton
          title={loading ? strings.processing : strings.continue}
          disabled={loading || !consent || !validAmount || updating}
          loading={loading}
          onPress={() => {
            trackEvent({
              interaction: InteractionTypes.BUTTON_PRESS,
              screen: "amountSelection",
              action: "CONTINUE",
            });
            handleAmount();
          }}
        />
      </View>

      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={TnC}
        />
      )}
    </SafeAreaView>
  );
};

export default Offer;
