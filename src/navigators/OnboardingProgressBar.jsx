import StepIndicator from "react-native-step-indicator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { progressBar, stepIndicatorStyles } from "../styles";
import { COLORS } from "../constants/Theme";

export default OnboardingProgressBar = (props) => {
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const bankStatus = useSelector((state) => state.bank.verifyStatus);

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      color: stepStatus === "finished" ? COLORS.primary : COLORS.gray,
      size: 15,
    };
    switch (position) {
      case 0: {
        stepStatus == "finished"
          ? (iconConfig.color = COLORS.white)
          : (iconConfig.color = COLORS.primaryPending);
        iconConfig.name = "file-document-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 1: {
        stepStatus == "finished"
          ? aadhaarStatus == "SUCCESS"
            ? (iconConfig.color = COLORS.white)
            : (iconConfig.color = COLORS.warning)
          : (iconConfig.color = COLORS.primaryPending);
        iconConfig.name = "card-account-details-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 2: {
        stepStatus == "finished"
          ? panStatus == "SUCCESS"
            ? (iconConfig.color = COLORS.white)
            : (iconConfig.color = COLORS.warning)
          : (iconConfig.color = COLORS.primaryPending);
        iconConfig.name = "smart-card-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 3: {
        stepStatus == "finished"
          ? bankStatus == "SUCCESS"
            ? (iconConfig.color = COLORS.white)
            : (iconConfig.color = COLORS.warning)
          : (iconConfig.color = COLORS.primaryPending);
        iconConfig.name = "bank-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      default: {
        iconConfig.name = "information-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
    }
  };

  const renderStepIndicator = (params) => getStepIndicatorIconConfig(params);

  return (
    <View style={progressBar.progressView}>
      <StepIndicator
        stepCount={4}
        customStyles={stepIndicatorStyles}
        currentPosition={props.step}
        labels={["Profile", "Aadhaar", "PAN", "Bank"]}
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  );
};
