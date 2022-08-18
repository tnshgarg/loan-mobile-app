import StepIndicator from "react-native-step-indicator";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { progressBar } from "../styles";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

export default ProgressBarTop = (props) => {
  const navigation = useNavigation();
  const secondIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentnColor: "#4E46F1",
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: "#4E46F1",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#4E46F1",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#4E46F1",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#4E46F1",
    stepIndicatorLabelFinishedColor: "#4E46F1",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 9,
    currentStepLabelColor: "#4E46F1",
  };
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "#ffffff" : "#4E46F1",
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "smartphone";
        break;
      }
      case 1: {
        iconConfig.name = "perm-identity";
        break;
      }
      case 2: {
        iconConfig.name = "mood";
        break;
      }
      case 3: {
        iconConfig.name = "payment";
        break;
      }
      case 4: {
        iconConfig.name = "info-outline";
        break;
      }
      case 5: {
        iconConfig.name = "camera-front";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const onStepPress = (position) => {
    let step = "";
    switch (position) {
      case 0:
        break;
      case 1:
        aadhaarStatus == "SUCCESS"
          ? (step = "AadhaarConfirm")
          : (step = "AadhaarForm");
        break;
      case 2:
        panStatus == "SUCCESS" ? (step = "PanConfirm") : (step = "PanForm");
        break;
      case 3:
        bankStatus == "SUCCESS"
          ? (step = "BankConfirm")
          : (step = "BankInfoForm");
        break;
      case 4:
        step = "PersonalDetailsForm";
        break;
      case 5:
        step = "PersonalImage";
        break;
      default:
        break;
    }
    navigation.navigate(step);
  };
  return (
    <View style={progressBar.progressView}>
      <StepIndicator
        stepCount={6}
        customStyles={secondIndicatorStyles}
        currentPosition={props.step}
        labels={[
          "Mobile Number",
          "Aadhaar Card",
          "PAN Card",
          "Bank Account",
          "Profile",
          "Photo",
        ]}
        onPress={onStepPress}
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  );
};
