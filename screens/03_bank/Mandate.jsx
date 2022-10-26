import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { COLORS } from "../../constants/Theme";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import Form from "../../templates/mandate/Form";
import Header from "../../components/atoms/Header";

const Mandate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("Mandate"));
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Mandate Confirmation"
        onLeftIconPress={() => navigation.navigate("BankForm")}
      />
      <ProgressBarTop step={5} />
      <Form type="Onboarding" />
    </SafeAreaView>
  );
};

export default Mandate;
