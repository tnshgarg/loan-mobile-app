import { STAGE } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import StepIndicator from "react-native-step-indicator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../../components/atoms/FormInput";
import Header from "../../../../components/atoms/Header";
import TermsAndPrivacyModal from "../../../../components/molecules/TermsAndPrivacyModal";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { ewaOfferPush } from "../../../../helpers/BackendPush";
import { addLoanAmount } from "../../../../store/slices/ewaLiveSlice";
import {
  checkBox,
  styles,
  welcome,
  stepIndicatorStyles,
} from "../../../../styles";
import TnC from "../../../../templates/docs/EWATnC.js";

const Offer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [validAmount, setValidAmount] = useState(true);

  const unipeEmployeeId = useSelector((state) => state.auth.id);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const offerId = useSelector((state) => state.ewaLive.offerId);
  const eligibleAmount = useSelector((state) => state.ewaLive.eligibleAmount);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);
  const [amount, setAmount] = useState(ewaLiveSlice?.eligibleAmount.toString());

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
    if (parseInt(amount) <= eligibleAmount) {
      if (STAGE !== "prod" || (STAGE === "prod" && parseInt(amount) > 999)) {
        setValidAmount(true);
        dispatch(addLoanAmount(parseInt(amount)));
      } else {
        setValidAmount("false");
      }
    } else {
      setValidAmount("false");
    }
  }, [amount]);

  useEffect(() => {
    if (fetched) {
      ewaOfferPush({
        offerId: offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error);
          Alert.alert("An Error occured", error);
        });
    }
  }, [fetched]);

  function handleAmount() {
    setLoading(true);
    if (validAmount) {
      ewaOfferPush({
        offerId: offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "CONFIRMED",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
        loanAmount: parseInt(amount),
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
          setLoading(false);
          navigation.navigate("EWA_KYC");
          Analytics.trackEvent("Ewa|OfferPush|Success", {
            userId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error);
          setLoading(false);
          Alert.alert("An Error occured", error);
          Analytics.trackEvent("Ewa|OfferPush|Error", {
            userId: unipeEmployeeId,
            error: error,
          });
        });
    }
  }

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      color: "white",
      size: 18,
      name: "check",
    };
    return iconConfig;
  };

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const data = ["KYC", "Agreement", "Money In Account"];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="On Demand Salary"
        onLeftIconPress={() => navigation.navigate("EWA")}
      />
      <View style={styles.container}>
        <FormInput
          placeholder="Enter amount"
          containerStyle={{ marginVertical: 20 }}
          inputStyle={{ ...FONTS.h2 }}
          keyboardType="numeric"
          value={amount}
          onChange={setAmount}
          autoFocus={true}
          maxLength={10}
          prependComponent={
            <Icon name="currency-inr" color="green" size={32} />
          }
        />

        <Text
          style={{
            alignSelf: "center",
            ...FONTS.body4,
            color: COLORS.gray,
            marginTop: -10,
          }}
        >
          You can choose between 1000 to {eligibleAmount}
        </Text>

        <Text
          style={{
            alignSelf: "center",
            ...FONTS.h3,
            color: COLORS.black,
            marginTop: 20,
          }}
        >
          Steps to Cash
        </Text>
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={3}
            // direction="horizontal"
            currentPosition={5}
            renderStepIndicator={renderStepIndicator}
            labels={data}
          />
        </View>

        {/* <Checkbox
        text={"I agree to the Terms and Conditions."}
        value={consent}
        setValue={setConsent}
      /> */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            value={consent}
            onValueChange={setConsent}
            style={checkBox.checkBox}
            tintColors={{ true: COLORS.primary }}
          />
          <Text style={checkBox.checkBoxText}>
            I agree to the
            <Text
              onPress={() => setIsTermsOfUseModalVisible(true)}
              style={styles.termsText}
            >
              {" "}
              Terms and Conditions
            </Text>
            .
          </Text>
        </View>
        <PrimaryButton
          title={loading ? "Processing" : "Continue"}
          disabled={loading || !consent || !validAmount}
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
