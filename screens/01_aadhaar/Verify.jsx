import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { Alert, SafeAreaView } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import AadhaarVerifyTemplate from "../../templates/aadhaar/Verify";
import { COLORS } from "../../constants/Theme";
import Header from "../../components/atoms/Header";

const AadhaarVerify = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backDisabled, setBackDisabled] = useState(true);
  const countDownTime = useSelector((state) => state.timer.aadhaar);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarVerify"));
  }, []);

  useEffect(() => {
    if (countDownTime < 2) {
      setBackDisabled(false);
    }
  }, [countDownTime]);

  const backAlert = () => {
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
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="Aadhaar OTP Verification"
        onLeftIconPress={() => (backDisabled ? null : backAlert())}
      />

      <ProgressBarTop step={2} />
      <AadhaarVerifyTemplate function={backAlert} />
    </SafeAreaView>
  );
};

export default AadhaarVerify;
