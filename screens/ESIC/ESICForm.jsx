import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useStateValue } from "../../StateProvider";
import { AppBar, IconButton, Icon, Button } from "@react-native-material/core";
import { styles, form } from "../styles";

export default ESICForm = () => {
  const navigation = useNavigation();
  const [{ user }, dispatch] = useStateValue();
  const [esic, setEsic] = useState("");
  const fields = [
    { title: "Do you have ESIC number?", value: esic, setValue: setEsic },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="ESIC Information"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Button
          uppercase={false}
          title="Continue"
          type="solid"
          color="#4E46F1"
          style={form.nextButton}
          onPress={() => {
            VerifyAadharOCR();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
