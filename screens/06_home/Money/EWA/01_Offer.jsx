import { STAGE } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
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
import MoneySilder from "../../../../components/organisms/MoneySilder";

const Offer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);

  const [validAmount, setValidAmount] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
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
    if (parseInt(amount) <= eligibleAmount) {
      if (STAGE !== "prod" || (STAGE === "prod" && parseInt(amount) > 999)) {
        setValidAmount(true);
        dispatch(addLoanAmount(parseInt(amount)));
      } else {
        setValidAmount(false);
      }
    } else {
      setValidAmount(false);
    }
  }, [amount]);

  useEffect(() => {
    if (fetched) {
      ewaOfferPush({
        data: {
          offerId: offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
        },
        token: token,
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error.toString());
          Alert.alert("An Error occured", error.toString());
        });
    }
  }, [fetched]);

  function handleAmount() {
    setLoading(true);
    if (validAmount) {
      ewaOfferPush({
        data: {
          offerId: offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "CONFIRMED",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          loanAmount: parseInt(amount),
        },
        token: token,
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
          setLoading(false);
          navigation.navigate("EWA_KYC");
          Analytics.trackEvent("Ewa|OfferPush|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error.toString());
          setLoading(false);
          Alert.alert("An Error occured", error.toString());
          Analytics.trackEvent("Ewa|OfferPush|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
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

  const data = ["KYC", "Mandate", "Agreement", "Disbursement"];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Advance Salary" onLeftIconPress={() => backAction()} />
      <View style={styles.container}>
        {/* <MoneySilder /> */}
        <FormInput
          placeholder="Enter amount"
          containerStyle={{ marginVertical: 10, marginHorizontal: 50 }}
          inputStyle={{ ...FONTS.h2, width: 20 }}
          keyboardType="numeric"
          value={amount}
          onChange={setAmount}
          autoFocus={true}
          maxLength={10}
          prependComponent={
            <Icon name="currency-inr" color="green" size={25} />
          }
        />

        <Text
          style={{
            alignSelf: "center",
            ...FONTS.body4,
            color: COLORS.gray,
          }}
        >
          You can choose between 1000 to {eligibleAmount}
        </Text>

        <Text
          style={{
            alignSelf: "center",
            ...FONTS.h3,
            color: COLORS.black,
            marginVertical: 20,
          }}
        >
          Steps to Cash
        </Text>
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={4}
            // direction="horizontal"
            currentPosition={5}
            renderStepIndicator={renderStepIndicator}
            labels={data}
          />
        </View>

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
