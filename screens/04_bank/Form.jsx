import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";
import Header from "../../components/atoms/Header";

const BankForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);

  useEffect(() => {
    dispatch(addCurrentScreen("BankForm"));
  }, []);

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "If you go back your PAN Verification will have to be redone. Continue only if you want to edit your PAN number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            panVerifyStatus === "SUCCESS"
              ? navigation.navigate("PanConfirm")
              : navigation.navigate("PanForm");
          },
        },
      ]
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <Header
          title="Bank Details"
          onLeftIconPress={() => backAction()}
        />
        <ProgressBarTop step={3} />
        <BankFormTemplate />
      </SafeAreaView>
    </>
  );
};

export default BankForm;
