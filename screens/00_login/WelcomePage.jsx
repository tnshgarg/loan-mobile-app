import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, stepIndicatorStyles, styles, welcome } from "../../styles";

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
    "Aadhaar Card",
    "PAN Card",
    "Bank Account",
    "Profile",
    "Photo",
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/unipe-Thumbnail.png")}
        />
        <Text style={welcome.subTitle}>
          Let’s start onboarding process by {"\n"} verifying below documents.
        </Text>
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={5}
            direction="vertical"
            renderStepIndicator={renderStepIndicator}
            currentPosition={0}
            labels={data}
          />
        </View>
        <PrimaryButton
          title="Welcome!"
          uppercase={false}
          onPress={() => {
            navigation.navigate("AadhaarForm");
          }}
        />
        <View style={checkBox.padding}></View>
      </SafeAreaView>
    </>
  );
};
