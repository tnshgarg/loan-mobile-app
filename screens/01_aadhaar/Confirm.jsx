import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import { COLORS } from "../../constants/Theme";

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

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <AppBar
        title="Aadhaar Data Confirmation"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => backAlert()}
          />
        }
      />

      <ProgressBarTop step={2} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <AadhaarConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AadhaarConfirm;
