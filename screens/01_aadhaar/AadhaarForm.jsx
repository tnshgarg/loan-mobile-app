import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";

import ProgressBarTop from "../../components/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarDataCollection from "../../templates/Aadhaar/AadhaarDataCollection";

export default AadhaarForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const SkipAadhaar = () => {
    Alert.alert(
      "Aadhaar KYC pending",
      `To formally complete your employment with the company, Aadhaar KYC is required.`,
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
        { text: "Yes", onPress: () => navigation.navigate("Otp") },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Aadhaar Verification"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => {
                backAlert();
              }}
            />
          }
          trailing={
            <IconButton
              icon={<Icon name="arrow-forward" size={20} color="white" />}
              onPress={() => {
                SkipAadhaar();
              }}
            />
          }
        />

        <ProgressBarTop step={1} />
        <AadhaarDataCollection />
      </SafeAreaView>
    </>
  );
};
