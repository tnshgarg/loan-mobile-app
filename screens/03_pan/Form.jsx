import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";
import Header from "../../components/atoms/Header";

export default PanForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const SkipPAN = () => {
    Alert.alert(
      "PAN KYC Required",
      `If you want to receive advance salary, PAN KYC is required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankForm") },
      ]
    );
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Do you want to go back ?",
        "If you go back you will have to redo Aadhaar verification. Continue if you want to edit your Aadhaar Details.",
        [
          { text: "No", onPress: () => null, style: "cancel" },
          {
            text: "Yes",
            onPress: () => navigation.navigate("PanForm"),
          },
        ]
      );
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
        title="PAN Verification"
        onLeftIconPress={() => navigation.navigate("AadhaarConfirm")}
        onRightIconPress={() => SkipPAN()}
      />

      <ProgressBarTop step={2} />
      <PanFormTemplate />
    </SafeAreaView>
  );
};
