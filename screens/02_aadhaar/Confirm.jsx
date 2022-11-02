import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import Header from "../../components/atoms/Header";

const AadhaarConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your AADHAAR Verification will have to be redone. Continue if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("AadhaarVerify") },
      ]
    );
  };

  useEffect(() => {
    const backAction = () => {
      backAlert();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.removeEventListener();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Aadhaar Data Confirmation"
        onLeftIconPress={() => backAlert()}
      />
      <ProgressBarTop step={1} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <AadhaarConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AadhaarConfirm;
