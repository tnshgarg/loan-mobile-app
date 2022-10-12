import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import BankConfirmApi from "../../apis/bank/Confirm";
import { COLORS } from "../../constants/Theme";

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

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <AppBar
        title="Bank Details Confirmation"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => backAlert()}
          />
        }
      />
      <ProgressBarTop step={4} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <BankConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankConfirm;
