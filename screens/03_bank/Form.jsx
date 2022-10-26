import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
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

  const SkipBank = () => {
    Alert.alert(
      "Bank KYC Required",
      `If you want to receive your salary on time, Bank details are required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        {
          text: "Yes",
          onPress: () => navigation.navigate("Mandate"),
        },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
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
