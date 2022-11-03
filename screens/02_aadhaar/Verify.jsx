import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import AadhaarVerifyTemplate from "../../templates/aadhaar/Verify";
import Header from "../../components/atoms/Header";

const AadhaarVerify = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [back, setBack] = useState(false);
  const countDownTime = useSelector((state) => state.timer.aadhaar);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarVerify"));
  }, []);

  useEffect(() => {
    if (countDownTime < 1) {
      setBack(true);
    }
  }, [countDownTime]);

  const backAction = () => {
    if (back) {
      Alert.alert(
        "OTP Timer",
        "You must wait for 10 minutes to resend OTP."
      );
    } else {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to go back? Continue if you want to edit your Aadhaar number.",
        [
          { text: "No", onPress: () => null, style: "cancel" },
          { text: "Yes", onPress: () => navigation.navigate("AadhaarForm") },
        ]
      );
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Aadhaar OTP Verification"
        onLeftIconPress={() => backAction()}
      />
      <ProgressBarTop step={1} />
      <AadhaarVerifyTemplate function={backAction} />
    </SafeAreaView>
  );
};

export default AadhaarVerify;
