import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import StepsIndicator from "./StepsIndicator";
import { SIZES } from "../../constants/Theme";

const KYCSteps = (props) => {
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
  const data = [
    "Mobile Number",
    "Aadhaar Card",
    "PAN Card",
    "Bank Account",
    "Profile",
    "Photo",
  ];
  return (
    <View style={styles.container}>
      <StepsIndicator
        stepCount={6}
        direction={props.step ? "horizontal" : "vertical"}
        renderStepIndicator={renderStepIndicator}
        currentPosition={props.step ? props.step : 0}
        labels={data}
        styles={{ labelSize: props.step ? SIZES.body5 : SIZES.body4 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
});

export default KYCSteps;
