import { useNavigation } from "@react-navigation/core";
import { Alert, BackHandler, SafeAreaView, ScrollView } from "react-native";

import { styles } from "../../styles";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PanConfirmApi from "../../apis/pan/Confirm";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { strings } from "../../helpers/Localization";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

export default PanConfirm = () => {
  const dispatch = useDispatch();
  
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanConfirm"));
  }, []);

  const backAction = () => {
    Alert.alert(strings.goBack, strings.goBackPanVerification, [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("PanForm") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        headline={strings.areThesePanDetails}
        onLeftIconPress={() => backAction()}
        subHeadline={
          "क्या ये स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?"
        }
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <PanConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};
