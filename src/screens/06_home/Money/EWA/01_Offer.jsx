import { useNavigation } from "@react-navigation/core";
import analytics from "@react-native-firebase/analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import TermsAndPrivacyModal from "../../../../components/molecules/TermsAndPrivacyModal";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import {
  addAPR,
  addLoanAmount,
  addNetAmount,
  addProcessingFees,
} from "../../../../store/slices/ewaLiveSlice";
import { styles } from "../../../../styles";
import TnC from "../../../../templates/docs/EWATnC.js";
import SliderCard from "../../../../components/organisms/SliderCard";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import Checkbox from "../../../../components/atoms/Checkbox";
import { useUpdateOfferMutation } from "../../../../store/apiSlices/ewaApi";

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
  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

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
    navigation.navigate("Money", { screen: "EWA" });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
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
    console.tron.log("validAmount, updating: ", validAmount, updating);
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
    console.tron.log(`dueDate, today: ${dueDate}, ${today}`);
    let timeDiff = dueDate.getTime() - today.getTime();
    let daysDiff = parseInt(timeDiff / (1000 * 3600 * 24)) + 1;
    let apr = 100 * (processingFees / parseInt(loanAmount)) * (365 / daysDiff);
    console.tron.log(
      "processingFees, loanAmount, daysDiff, APR: ",
      processingFees,
      loanAmount,
      daysDiff,
      apr
    );
    return apr.toFixed(2);
  };

  const handleConditionalNav = () => {
    console.tron.log( profileComplete, aadhaarVerifyStatus, panVerifyStatus, bankVerifyStatus , onboarded);
    if (!profileComplete) {
      navigation.navigate("EWA_KYC_STACK", { screen: "ProfileForm" });
    } else if (aadhaarVerifyStatus === "INPROGRESS_OTP") {
      navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarVerify" });
    } else if (aadhaarVerifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarConfirm" });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarForm" });
    } else if (panVerifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWA_KYC_STACK", { screen: "PanConfirm" });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("EWA_KYC_STACK", { screen: "PanForm" });
    } else if (bankVerifyStatus === "INPROGRESS_CONFIRMATION") {
      navigation.navigate("EWA_KYC_STACK", { screen: "BankConfirm" });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("EWA_KYC_STACK", { screen: "BankForm" });
    } else if (onboarded) {
      navigation.navigate("EWA_KYC");
    }
  };

  function handleAmount() {
    setLoading(true);
    if (validAmount && fetched) {
      let data = {
        offerId: ewaLiveSlice.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "CONFIRMED",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
        loanAmount: parseInt(loanAmount),
        campaignId: campaignId,
      };
      updateOffer(data)
        .then((response) => {
          console.tron.log("updateOfferMutateAsync response.data: ", response.data);
          setLoading(false);
          handleConditionalNav();
          analytics().logEvent("Ewa_OfferPush_Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.tron.log("updateOfferMutateAsync error: ", error.message);
          setLoading(false);
          Alert.alert("An Error occured", error.message);
          analytics().logEvent("Ewa_OfferPush_Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.message,
          });
        });
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="On-Demand Salary"
        onLeftIconPress={() => backAction()}
        progress={25}
      />
      <View style={styles.container}>
        <Text style={[styles.headline, { alignSelf: "flex-start" }]}>
          How much do you want?
        </Text>
        <Text style={[styles.subHeadline, { alignSelf: "flex-start" }]}>
          Here is your access of emergency funds
        </Text>

        <SliderCard
          info={"Zero Interest charges, Nominal Processing Fees"}
          iconName="brightness-percent"
          amount={loanAmount}
          setAmount={setLoanAmount}
          eligibleAmount={ewaLiveSlice.eligibleAmount}
        />
        <View style={{ flex: 1 }} />

        <Checkbox
          text={"I agree to the"}
          value={consent}
          setValue={setConsent}
          additionalText="Terms and Conditions"
          onPress={() => setIsTermsOfUseModalVisible(true)}
        />

        <PrimaryButton
          title={loading ? "Processing" : "Continue"}
          disabled={loading || !consent || !validAmount || updating}
          loading={loading}
          onPress={() => {
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
