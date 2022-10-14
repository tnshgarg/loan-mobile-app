import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanConfirmApi from "../../apis/pan/Confirm";
import { COLORS } from "../../constants/Theme";
import Header from "../../components/atoms/Header";

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
      <Header title="PAN Confirmation" onLeftIconPress={() => backAlert()} />

      <ProgressBarTop step={3} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <PanConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};
