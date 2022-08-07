import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Image, SafeAreaView, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import StepIndicator from "react-native-step-indicator";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, styles, welcome } from "../../styles";
import Loading from "../../components/Loading";

export default WelcomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const navigation = useNavigation();
  SplashScreen.hide();
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
    "Mobile Number Verification",
    "Aadhar Card Verification",
    "PAN Card Verification",
    "Bank Details",
    "Basic Details",
    "User Photo Capture",
  ];
  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#4E46F1",
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: "#4E46F1",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#4E46F1",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#4E46F1",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 14,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: "#4E46F1",
    stepIndicatorLabelFinishedColor: "#4E46F1",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 14,
    currentStepLabelColor: "#4E46F1",
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/unipe-Thumbnail.png")}
        />
        <Text style={welcome.mainTitle}>Hello,</Text>
        <Text style={welcome.subTitle}>
          Let’s verify the below documents & start the onboarding process.
        </Text>
        {/* {data.map((datai,index)=>{
      return(
        <Text style={welcome.title} key={index}><Text>{'\u2B24'}</Text>  {datai}</Text>
      )
    })} */}
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
        <Button
          style={form.nextButton}
          title="Welcome! Let’s start onboarding process with Unipe"
          uppercase={false}
          onPress={() => {
            navigation.navigate("Login");
          }}
        ></Button>
        <View style={checkBox.padding}></View>
      </SafeAreaView>
    </>
  );
};
