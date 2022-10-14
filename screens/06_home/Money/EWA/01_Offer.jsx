import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import StepIndicator from "react-native-step-indicator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../../components/PrimaryButton";
import { ewaOfferPush } from "../../../../helpers/BackendPush";
import { addLoanAmount } from "../../../../store/slices/ewaLiveSlice";
import { bankform, checkBox, styles, welcome } from "../../../../styles";
import { COLORS } from "../../../../constants/Theme";
import Header from "../../../../components/atoms/Header";
import Checkbox from "../../../../components/atoms/Checkbox";

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
          navigation.navigate("EWA_KYC");
          setLoading(false);
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error);
          Alert.alert("An Error occured", error);
        });
    }
  }

  useEffect(() => {
    if (parseInt(amount) > 999 && parseInt(amount) <= eligibleAmount) {
      setValidAmount(true);
      dispatch(addLoanAmount(parseInt(amount)));
    } else {
      setValidAmount(false);
    }
  }, [amount]);

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

  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 2,
    stepStrokeFinishedColor: "#aaaaaa",
    stepStrokeUnFinishedColor: "#006400",
    separatorFinishedColor: "#aaaaaa",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#006400",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 14,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: "#006400",
    stepIndicatorLabelFinishedColor: "#006400",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "black",
    labelSize: 14,
    labelAlign: "flex-start",
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="On Demand Salary"
        onLeftIconPress={() => navigation.navigate("Home")}
      />
      <View
        style={{
          backgroundColor: "#E5EAF7",
          width: "85%",
          height: "20%",
          alignSelf: "center",
          marginTop: 10,
          borderRadius: 10,
          paddingTop: 18,
          paddingBottom: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            paddingBottom: 10,
            alignSelf: "center",
          }}
        >
          <Icon
            name="currency-inr"
            color="green"
            size={32}
            style={{ marginTop: 8, marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 32,
              color: "green",
              borderWidth: 1,
              width: 5,
            }}
            keyboardType="numeric"
            textAlign={"center"}
            value={amount}
            onChangeText={setAmount}
            isFocused={true}
          />
        </View>

        <Text
          style={{
            fontSize: 14,
            alignSelf: "center",
            color: "#0D2A4E",
            marginTop: 10,
          }}
        >
          You can choose between 1000 to {eligibleAmount}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 20,
          alignSelf: "center",
          fontWeight: "bold",
          color: "#0D2A4E",
          marginTop: 10,
        }}
      >
        Steps to Cash
      </Text>
      <View style={welcome.steps}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={3}
          direction="vertical"
          currentPosition={5}
          renderStepIndicator={renderStepIndicator}
          labels={data}
        />
      </View>

      <Checkbox
        text={"I agree to the Terms and Conditions."}
        value={consent}
        setValue={setConsent}
      />
      <PrimaryButton
        title={loading ? "Processing" : "Continue"}
        color={COLORS.primary}
        uppercase={false}
        disabled={loading || !consent || !validAmount}
        onPress={() => {
          handleAmount();
        }}
      />
      <View style={bankform.padding}></View>
    </SafeAreaView>
  );
};

export default Offer;
