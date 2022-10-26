import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import { styles } from "../../styles";
import Header from "../../components/atoms/Header";

const AadhaarForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const SkipAadhaar = () => {
    Alert.alert(
      "AADHAAR KYC Required",
      `If you want to receive advance salary, AADHAAR KYC is required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("PanForm") },
      ]
    );
  };

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Mobile Number Verification will have to be redone.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("AadhaarForm") },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="Aadhaar Verification"
        onLeftIconPress={() => backAlert()}
      />

      <ProgressBarTop step={2} />
      <AadhaarFormTemplate />
    </SafeAreaView>
  );
};

export default AadhaarForm;
