import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { SafeAreaView } from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import AadhaarOtpVerify from "../../templates/aadhaar/AadhaarOtpVerify";

export default AadhaarVerify = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backDisabled, setBackDisabled] = useState(true);
  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(true);
  const countDownTime = useSelector((state) => state.timer.aadhaar);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarVerify"));
  }, []);

  useEffect(() => {
    setValidOtp(otp.length === 6);
  }, [otp]);

  const BackAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back you will have to wait 10 minutes. Continue if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => navigation.navigate("AadhaarForm"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Aadhaar OTP Verification"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => navigation.navigate("AadhaarForm")}
            disabled={backDisabled}
          />
        }
      />

      <ProgressBarTop step={1} />
      <AadhaarOtpVerify function={BackAlert} />
    </SafeAreaView>
  );
};
