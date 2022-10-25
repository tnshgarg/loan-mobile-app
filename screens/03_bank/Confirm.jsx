import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView, BackHandler } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import BankConfirmApi from "../../apis/bank/Confirm";
import { COLORS } from "../../constants/Theme";
import Header from "../../components/atoms/Header";

const BankConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("BankConfirm"));
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Bank Verification will have to be redone. Continue only if you want to edit your Bank Account Details.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankForm") },
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

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        onLeftIconPress={() => backAlert()}
        title="Bank Details Confirmation"
      />
      <ProgressBarTop step={4} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <BankConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankConfirm;
