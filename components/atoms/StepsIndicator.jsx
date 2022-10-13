import { View, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../constants/Theme";

const StepsIndicator = ({
  styles,
  renderStepIndicator,
  labels,
  stepCount,
  direction,
  currentPosition,
}) => {
  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: COLORS.primary,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: COLORS.primary,
    stepStrokeUnFinishedColor: COLORS.lightGray,
    separatorFinishedColor: COLORS.primary,
    separatorUnFinishedColor: COLORS.lightGray,
    stepIndicatorFinishedColor: COLORS.primary,
    stepIndicatorUnFinishedColor: COLORS.white,
    stepIndicatorCurrentColor: COLORS.white,
    stepIndicatorLabelFontSize: SIZES.body4,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: COLORS.primary,
    stepIndicatorLabelFinishedColor: COLORS.primary,
    stepIndicatorLabelUnFinishedColor: COLORS.lightGray,
    labelColor: COLORS.gray,
    labelSize: SIZES.body5,
    currentStepLabelColor: COLORS.primary,
    labelAlign: "flex-start",
  };
  return (
    <StepIndicator
      customStyles={{ ...stepIndicatorStyles, ...styles }}
      stepCount={stepCount}
      direction={direction ? direction : "horizontal"}
      renderStepIndicator={renderStepIndicator}
      currentPosition={currentPosition}
      labels={labels}
    />
  );
};

export default StepsIndicator;
