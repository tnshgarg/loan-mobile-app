import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankFormTemplate from "../../templates/bank/Form";


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
          onPress: () => navigation.navigate("PersonalDetailsForm"),
        },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Bank Details"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("PanForm")}
            />
          }
          trailing={
            <IconButton
              icon={<Icon name="arrow-forward" size={20} color="white" />}
              onPress={() => {
                SkipBank();
              }}
            />
          }
        />
        <ProgressBarTop step={3} />

        <BankFormTemplate />
        
      </SafeAreaView>
    </>
  );
};

export default BankForm;
