import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "../../../components/PrimaryButton";
import { KeyboardAvoidingWrapper } from "../../../KeyboardAvoidingWrapper";
import { form, bankform, styles } from "../../../styles";
import Verify from "../../../apis/bank/Verify";

const Mandate = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [ifscNext, setIfscNext] = useState(false);
  const [accNumNext, setAccNumNext] = useState(false);

  useEffect(() => {
    var accountNumberReg = /^[0-9]{9,18}$/gm;
    if (accountNumberReg.test(number)) {
      setAccNumNext(true);
    } else {
      setAccNumNext(false);
    }
  }, [number]);

  useEffect(() => {
    var ifscReg = /^[A-Z]{4}0[A-Z0-9]{6}$/gm;
    if (ifscReg.test(ifsc)) {
      setIfscNext(true);
    } else {
      setIfscNext(false);
    }
  }, [ifsc]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Mandate"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <KeyboardAvoidingWrapper>
        <View>
          <Text style={bankform.formtitle}>Account Holder Name</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            required
          />
          <Text style={bankform.formtitle}>Bank Account Number</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={number}
            onChangeText={setNumber}
            required
          />
          {number && !accNumNext ? (
            <Text style={bankform.formatmsg}>Incorrect Format</Text>
          ) : null}

          <Text style={bankform.formtitle}>IFSC</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="characters"
            value={ifsc}
            onChangeText={setIfsc}
            required
          />
          {ifsc && !ifscNext ? (
            <Text style={bankform.formatmsg}>Incorrect Format</Text>
          ) : null}

          <PrimaryButton
            title="My Details are Correct"
            uppercase={false}
            onPress={() => {
              navigation.navigate("EWALoanDetails");
            }}
          />
          <View style={bankform.padding}></View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Mandate;
