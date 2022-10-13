import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, stepIndicatorStyles, styles, welcome } from "../../styles";
import SVGImg from "../../assets/UnipeLogo.svg";

export default WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? COLORS.white : COLORS.primary,
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "perm-identity";
        break;
      }
      case 1: {
        iconConfig.name = "mood";
        break;
      }
      case 2: {
        iconConfig.name = "payment";
        break;
      }
      case 3: {
        iconConfig.name = "library-add-check";
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
    "Aadhaar Card",
    "PAN Card",
    "Bank Account",
    "Mandate",
    "Profile",
    "Photo",
  ];

  return (
    <SafeAreaView style={[styles.container, { padding: 10 }]}>
      <SVGImg style={styles.logo} />
      <Text style={styles.headline}>
        Let’s start onboarding process by {"\n"} verifying below documents.
      </Text>
      <View style={welcome.steps}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={6}
          direction="vertical"
          renderStepIndicator={renderStepIndicator}
          currentPosition={0}
          labels={data}
        />
      </View>
      <PrimaryButton
        title="Welcome!"
        color={COLORS.primary}
        uppercase={false}
        onPress={() => {
          navigation.navigate("AadhaarForm");
        }}
      />
    </SafeAreaView>
  );
};
