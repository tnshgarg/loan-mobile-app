import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, SafeAreaView } from "react-native";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import ProgressBarTop from "../../components/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import { styles } from "../../styles";
import { COLORS } from "../../constants/Theme";

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
        { text: "Yes", onPress: () => navigation.navigate("Login") },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <AppBar
          title="Aadhaar Verification"
          color={COLORS.primary}
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color={COLORS.white} />}
              onPress={() => {
                backAlert();
              }}
            />
          }
          trailing={
            <IconButton
              icon={
                <Icon name="arrow-forward" size={20} color={COLORS.white} />
              }
              onPress={() => {
                SkipAadhaar();
              }}
            />
          }
        />

        <ProgressBarTop step={0} />
        <AadhaarFormTemplate />
      </SafeAreaView>
    </>
  );
};

export default AadhaarForm;
