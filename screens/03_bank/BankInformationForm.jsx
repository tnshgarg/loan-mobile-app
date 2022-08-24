import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import BankInformationCollection from "../../templates/Bank/BankInformationCollection";

export default BankInformationForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("BankInfoForm"));
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("PanForm")}
            />
          }
        />
        <ProgressBarTop step={3} />
        <BankInformationCollection />
      </SafeAreaView>
    </>
  );
};
