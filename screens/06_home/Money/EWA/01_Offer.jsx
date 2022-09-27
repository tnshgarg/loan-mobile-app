import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../../../components/PrimaryButton";
import { addLoanAmount } from "../../../../store/slices/ewaLiveSlice";
import { ewaOfferPush } from "../../../../helpers/BackendPush";
import { bankform, checkBox, styles, welcome } from "../../../../styles";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";

const Offer = () => {
  
  let DeviceId = 0;
  let DeviceIp = 0;

  getUniqueId().then((id) => {
    DeviceId = id;
  });
  NetworkInfo.getIPV4Address().then((ipv4Address) => {
    DeviceIp = ipv4Address;
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const employeeId = useSelector((state) => state.auth.id);
  const name =
    useSelector((state) => state.aadhaar.data["aadhaar_data"]?.["name"]) ||
    useSelector((state) => state.pan?.name) ||
    "User";
  
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const offerId = useSelector((state) => state.ewaLive.offerId);
  const eligibleAmount = useSelector((state) => state.ewaLive.eligibleAmount);
  const [amount, setAmount] = useState(ewaLiveSlice?.eligibleAmount.toString());
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    ewaOfferPush({
      offerId: offerId,
      unipeEmployeeId: employeeId,
      status: "INPROGRESS",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
    })
    .then((response) => {
      console.log("ewaOfferPush response.data: ", response.data);
    })
    .catch((error) => {
      console.log("ewaOfferPush error: ", error);
      Alert.alert("An Error occured", error);
    });;
  }, []);

  function handleAmount() {
    ewaOfferPush({
      offerId: offerId,
      unipeEmployeeId: employeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: DeviceIp,
      deviceId: DeviceId,
      loanAmount: parseInt(amount),
    })
    .then((response) => {
      console.log("ewaOfferPush response.data: ", response.data);
      navigation.navigate("EWA_KYC");
    })
    .catch((error) => {
      console.log("ewaOfferPush error: ", error);
      Alert.alert("An Error occured", error);
    });
  }

  useEffect(() => {
    dispatch(addLoanAmount(parseInt(amount)));
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
  const data = [
    "Personal Details",
    "KYC",
    "Loan Agreement",
    "Money In Account",
  ];
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
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Advanced Salary"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        }
      />
      <View
        style={{
          backgroundColor: "#E5EAF7",
          width: "95%",
          height: "30%",
          alignSelf: "center",
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#0D2A4E", padding: 12, fontSize: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Hello {name},
          </Text>
          {"\n"}Here is your Access of Emergency Funds
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            width: "60%",
            paddingBottom: 10,
            alignSelf: "center",
          }}
        >
          <Icon name="currency-inr" color="#000" size={42} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 32,
              color: "#0D2A4E",
            }}
            keyboardType="numeric"
            textAlign={"center"}
            value={amount}
            onChangeText={setAmount}
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
          You choose between 1000 to {eligibleAmount} rupees{" "}
        </Text>
        <Text
          style={{
            fontSize: 14,
            alignSelf: "center",
            color: "#0D2A4E",
            marginTop: 10,
          }}
        >
          Zero Interest charges, Nominal Processing Fees
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
          stepCount={4}
          direction="vertical"
          currentPosition={5}
          renderStepIndicator={renderStepIndicator}
          labels={data}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <CheckBox
          value={consent}
          onValueChange={setConsent}
          style={checkBox.checkBox}
          tintColors={{ true: "#4E46F1" }}
        />
        <Text style={checkBox.checkBoxText}>
          I agree to the Terms and Conditions.
        </Text>
      </View>
      <PrimaryButton
        title="Get It Now"
        uppercase={false}
        disabled={!consent}
        onPress={() => {
          handleAmount();
        }}
      />
      <View style={bankform.padding}></View>
    </SafeAreaView>
  );
};

export default Offer;
