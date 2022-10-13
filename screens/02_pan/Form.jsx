import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";
import { COLORS } from "../../constants/Theme";

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
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <AppBar
          title="PAN Verification"
          color={COLORS.primary}
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              // TODO: Conditional if Aadhaar verified or not
              onPress={() => navigation.navigate("AadhaarConfirm")}
            />
          }
          trailing={
            <IconButton
              icon={<Icon name="arrow-forward" size={20} color="white" />}
              onPress={() => {
                SkipPAN();
              }}
            />
          }
        />

        <ProgressBarTop step={3} />
        <PanFormTemplate />
      </SafeAreaView>
    </>
  );
};
