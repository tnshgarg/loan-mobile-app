import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { COLORS } from "../../constants/Theme";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import Form from "../../templates/mandate/Form";

const Mandate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(addCurrentScreen("BankForm"));
  }, []);
  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <AppBar
        title="Mandate Confirmation"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => navigation.navigate("BankForm")}
          />
        }
        trailing={
          <IconButton
            icon={<Icon name="arrow-forward" size={20} color="white" />}
            onPress={() => navigation.navigate("PersonalDetailsForm")}
          />
        }
      />
      <ProgressBarTop step={3} />
      <Form type="Onboarding" />
    </SafeAreaView>
  );
};

export default Mandate;
