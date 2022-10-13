import StepIndicator from "react-native-step-indicator";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
      color: stepStatus === "finished" ? "#2CB77C" : "#4E46F1",
      size: 15,
    };
    switch (position) {
      case 0: {
        stepStatus == "finished"
          ? aadhaarStatus == "SUCCESS"
            ? (iconConfig.color = COLORS.primary)
            : (iconConfig.color = "red")
          : "#4E46F1";
        iconConfig.name = "card-account-details-outline";
        return <MaterialCommunityIcons {...iconConfig} />
        
      }
      case 1: {
        stepStatus == "finished"
          ? panStatus == "SUCCESS"
            ? (iconConfig.color = COLORS.primary)
            : (iconConfig.color = "red")
          : "#4E46F1";
        iconConfig.name = "smart-card-outline";
        return <MaterialCommunityIcons {...iconConfig} />
      }
      case 2: {
        stepStatus == "finished"
          ? bankStatus == "SUCCESS"
            ? (iconConfig.color = COLORS.primary)
            : (iconConfig.color = "red")
          : "#4E46F1";
        iconConfig.name = "bank-outline";
        return <MaterialCommunityIcons {...iconConfig} />
      }
      case 3: {
        stepStatus == "finished"
        ? mandateStatus == "SUCCESS"
          ? (iconConfig.color = COLORS.primary)
          : (iconConfig.color = "red")
        : "#4E46F1";
        iconConfig.name = "bank-check";
        return <MaterialCommunityIcons {...iconConfig} />
      }
      case 4: {
        iconConfig.name = "file-document-outline";
        return <MaterialCommunityIcons {...iconConfig} />
      }
      case 5: {
        iconConfig.name = "camera-outline";
        return <MaterialCommunityIcons {...iconConfig} />
      }
      default: {
        iconConfig.name = "info-outline";
        return <MaterialIcons {...iconConfig} />
      }
    }
  };

  const renderStepIndicator = (params) => (
    getStepIndicatorIconConfig(params)
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
          "Aadhaar",
          "PAN",
          "Bank",
          "Mandate",
          "Profile",
          "Photo",
        ]}
        // onPress={onStepPress}
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  );
};