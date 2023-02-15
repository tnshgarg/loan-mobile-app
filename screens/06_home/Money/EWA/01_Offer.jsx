import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
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
import Checkbox from "../../../../components/atoms/Checkbox";
import { updateOffer } from "../../../../queries/ewa/offer";

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
  const profileComplete = useSelector(
    (state) => state.profile.profileComplete
  );
  const aadhaarComplete = useSelector((state) => state.aadhaar.verifyStatus);
  const panComplete = useSelector((state) => state.pan.verifyStatus);
  const bankComplete = useSelector((state) => state.bank.verifyStatus);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const fees = useSelector((state) => state.ewaLive.fees);
  const [loanAmount, setLoanAmount] = useState(ewaLiveSlice?.eligibleAmount);
  const [processingFees, setProcessingFees] = useState(
    ewaLiveSlice?.processingFees
  );

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

  const { mutateAsync: updateOfferMutateAsync } = updateOffer();

  useEffect(() => {
    if (fetched) {
      updateOfferMutateAsync({
        data: {
          offerId: ewaLiveSlice.offerId,
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
          console.log("updateOfferMutateAsync response.data: ", response.data);
        })
        .catch((error) => {
          console.log("updateOfferMutateAsync error: ", error.toString());
          Alert.alert("An Error occured", error.toString());
        });
    }
  }, [fetched]);

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
    console.log("validAmount, updating: ", validAmount, updating);
  }, [loanAmount]);

  useEffect(() => {
    var pf = (parseInt(loanAmount) * fees) / 100;
    var pF;
    if (parseInt(pf) % 10 < 4) {
      pF = Math.max(9, Math.floor(pf / 10) * 10 - 1);
    } else {
      pF = Math.max(9, Math.floor((pf + 10) / 10) * 10 - 1);
    }
    setProcessingFees(pF);
    dispatch(addProcessingFees(pF));
    dispatch(addNetAmount(parseInt(loanAmount) - pF));
    dispatch(addAPR(APR(processingFees, loanAmount)));
    setUpdating(false);
  }, [loanAmount, processingFees]);

  const APR = (processingFees, loanAmount) => {
    var today = new Date();
    var dueDateComponents = ewaLiveSlice.dueDate.split("/");
    var dueDate = new Date(
      dueDateComponents[2],
      parseInt(dueDateComponents[1])-1,
      dueDateComponents[0]
    );
    console.log(`dueDate, today: ${dueDate}, ${today}`);
    var timeDiff = dueDate.getTime() - today.getTime();
    var daysDiff = parseInt(timeDiff / (1000 * 3600 * 24)) + 1;
    var apr = 100 * (processingFees / parseInt(loanAmount)) * (365 / daysDiff);
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
    if (onboarded) {
      navigation.navigate("EWA_KYC");
    } else {
      if (!profileComplete) {
        navigation.navigate("EWA_KYC_STACK", { screen: "ProfileForm" });
      } else {
        if (aadhaarComplete != "SUCCESS") {
          navigation.navigate("EWA_KYC_STACK", { screen: "AadhaarForm" });
        } else {
          if (panComplete != "SUCCESS") {
            navigation.navigate("EWA_KYC_STACK", { screen: "PanForm" });
          } else {
            if (bankComplete != "SUCCESS") {
              navigation.navigate("EWA_KYC_STACK", { screen: "BankForm" });
            } else {
              navigation.navigate("EWA_KYC");
            }
          }
        }
      }
    }
  };

  function handleAmount() {
    setLoading(true);
    if (validAmount) {
      updateOfferMutateAsync({
        data: {
          offerId: ewaLiveSlice.offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "CONFIRMED",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          loanAmount: parseInt(loanAmount),
          campaignId: campaignId,
        },
        token: token,
        xpath: "ewa/offer",
      })
        .then((response) => {
          console.log("updateOfferMutateAsync response.data: ", response.data);
          setLoading(false);
          handleConditionalNav();
          Analytics.trackEvent("Ewa|OfferPush|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("updateOfferMutateAsync error: ", error.toString());
          setLoading(false);
          Alert.alert("An Error occured", error.toString());
          Analytics.trackEvent("Ewa|OfferPush|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
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
