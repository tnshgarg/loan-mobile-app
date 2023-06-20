import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView, BackHandler } from "react-native";

import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import BankConfirmApi from "../../apis/bank/Confirm";
import Header from "../../components/atoms/Header";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";

const BankConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("BankConfirm"));
  }, []);

  const backAction = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Bank Verification will have to be redone. Continue only if you want to edit your Bank Account Details.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankForm") },
      ]
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={"Verify your bank account details"}
        onLeftIconPress={() => backAction()}
        subHeadline={
          "क्या ये स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?"
        }
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <BankConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankConfirm;
