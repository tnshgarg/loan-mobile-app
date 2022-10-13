import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanConfirmApi from "../../apis/pan/Confirm";
import { COLORS } from "../../constants/Theme";

export default PanConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanConfirm"));
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your PAN Verification will have to be redone. Continue if you want to edit your PAN number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("PanForm") },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <AppBar
        title="PAN Confirmation"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => backAlert()}
          />
        }
      />

      <ProgressBarTop step={3} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <PanConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};
