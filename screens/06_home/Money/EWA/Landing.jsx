import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../../components/PrimaryButton";
import { bankform, checkBox, styles, welcome } from "../../../../styles";
import {
  addAmount,
  addConsent,
} from "../../../../store/slices/ewa/ewaLandingSlice";
const Landing = () => {
  const navigation = useNavigation();
  const name =
    useSelector((state) => state.aadhaar.data["aadhaar_data"]?.["name"]) ||
    useSelector((state) => state.pan?.name) ||
    "User";
  const eligibleAmount = useSelector((state) => state.ewaConfig.eligibleAmount);
  const [amount, setAmount] = useState(eligibleAmount);
  const [consent, setConsent] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    dispatch(addAmount(amount));
  }, [amount]);

  useEffect(() => {
    dispatch(addConsent(consent));
  }, [consent]);

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
    "Mandate Registration",
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
              color: canEdit ? "#0D2A4E" : "grey",
            }}
            keyboardType="numeric"
            textAlign={"center"}
            value={amount}
            onChangeText={setAmount}
            editable={canEdit}
          />
          <Icon
            name="pencil"
            color="#000"
            size={38}
            onPress={() => {
              setCanEdit(!canEdit);
            }}
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
          You choose between 1000 to {amount} rupees{" "}
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
          stepCount={5}
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
          navigation.navigate("EWADetails");
        }}
      />
      <View style={bankform.padding}></View>
    </SafeAreaView>
  );
};

export default Landing;
