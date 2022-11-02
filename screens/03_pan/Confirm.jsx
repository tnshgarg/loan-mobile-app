import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanConfirmApi from "../../apis/pan/Confirm";
import Header from "../../components/atoms/Header";

export default PanConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanConfirm"));
  }, []);
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Do you want to go back ?",
        "If you go back you will have to redo pan verification. Continue if you want to edit your pan number.",
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
    <SafeAreaView style={styles.safeContainer}>
      <Header title="PAN Confirmation" onLeftIconPress={() => backAlert()} />
      <ProgressBarTop step={2} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <PanConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};
