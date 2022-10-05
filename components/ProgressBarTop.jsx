import StepIndicator from "react-native-step-indicator";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { progressBar, stepIndicatorStyles } from "../styles";
import { COLORS } from "../constants/Theme";

export default ProgressBarTop = (props) => {
  const navigation = useNavigation();

  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "green" : COLORS.primary,
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "perm-identity";
        stepStatus == "finished"
          ? aadhaarStatus == "SUCCESS"
            ? (iconConfig.color = "green")
            : (iconConfig.color = "red")
          : COLORS.primary;

        break;
      }
      case 1: {
        iconConfig.name = "mood";
        stepStatus == "finished"
          ? panStatus == "SUCCESS"
            ? (iconConfig.color = "green")
            : (iconConfig.color = "red")
          : COLORS.primary;
        break;
      }
      case 2: {
        iconConfig.name = "payment";
        stepStatus == "finished"
          ? bankStatus == "SUCCESS"
            ? (iconConfig.color = "green")
            : (iconConfig.color = "red")
          : COLORS.primary;
        break;
      }
      case 3: {
        iconConfig.name = "library-add-check";
        stepStatus == "finished"
          ? mandateStatus == "SUCCESS"
            ? (iconConfig.color = "green")
            : (iconConfig.color = "red")
          : COLORS.primary;
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

  const onStepPress = (position) => {
    let step = "";
    switch (position) {
      case 0:
        aadhaarStatus == "SUCCESS"
          ? (step = "AadhaarConfirm")
          : (step = "AadhaarForm");
        break;
      case 1:
        panStatus == "SUCCESS" ? (step = "PanConfirm") : (step = "PanForm");
        break;
      case 2:
        bankStatus == "SUCCESS" ? (step = "BankConfirm") : (step = "BankForm");
        break;
      case 3:
        step = "Mandate";
        break;
      case 4:
        step = "PersonalDetailsForm";
        break;
      case 5:
        step = "PersonalImage";
        break;
    }
    navigation.navigate(step);
  };
  return (
    <View style={progressBar.progressView}>
      <StepIndicator
        stepCount={6}
        customStyles={stepIndicatorStyles}
        currentPosition={props.step}
        labels={[
          "Aadhaar Card",
          "PAN Card",
          "Bank Account",
          "Mandate",
          "Profile",
          "Photo",
        ]}
        onPress={onStepPress}
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  );
};
