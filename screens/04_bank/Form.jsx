import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";
import Header from "../../components/atoms/Header";

const BankForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("BankForm"));
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <Header
          title="Bank Details"
          onLeftIconPress={() => navigation.navigate("PanForm")}
        />
        <ProgressBarTop step={3} />
        <BankFormTemplate />
      </SafeAreaView>
    </>
  );
};

export default BankForm;
