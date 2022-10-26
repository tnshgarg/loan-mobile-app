import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="PAN Verification"
        onLeftIconPress={() => navigation.navigate("AadhaarConfirm")}
        onRightIconPress={() => SkipPAN()}
      />

      <ProgressBarTop step={3} />
      <PanFormTemplate />
    </SafeAreaView>
  );
};
