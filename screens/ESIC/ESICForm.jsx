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
import { styles, form, bankform } from "../styles";
import StateDropdown from "../../components/StateDropdown";
import { Picker } from "@react-native-picker/picker";

export default ESICForm = () => {
  const navigation = useNavigation();
  const [{ user }, dispatch] = useStateValue();
  const [esic, setEsic] = useState("");
  const [eeCode, setEECode] = useState("");
  const [relation, setRelation] = useState("");
  const [relationName, setRelationName] = useState("");
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");

  const relations = [
    "Spouse",
    "Minor dependant son",
    "Dependant unmarried daughter",
    "Dependant son receiving education",
    "Dependant infirm son",
    "Dependant infirm unmarried daughter",
    "Dependant father",
    "Dependant mother",
    "Brother",
    "Sister",
    "Others",
  ];
  const fields = [
    {
      title: "Employer Establishment Code*",
      value: eeCode,
      setValue: setEECode,
    },
    { title: "ESIC Number", value: esic, setValue: setEsic },
    {
      title: "Father's / Husband's Name *",
      value: relationName,
      setValue: setRelationName,
    },
    {
      title: "Relation with Employee (Father/Husband) *",
      value: relation,
      setValue: setRelation,
    },
    {
      title: "Name of Nominee (As per Aadhaar card) *",
      value: nomineeName,
      setValue: setNomineeName,
    },
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
        {fields.map((field, index) => {
          return (
            <>
              <Text style={bankform.formtitle} key={index}>
                {field.title}{" "}
              </Text>
              <TextInput
                style={bankform.formInput}
                value={field.value}
                onChangeText={field.setValue}
              />
            </>
          );
        })}
        <Text style={bankform.formtitle}>
          Nominee Relationship with Employee *
        </Text>
        <Picker
          style={form.picker}
          prompt="Nominee Relationship with Employee *"
          selectedValue={nomineeRelation}
          onValueChange={setNomineeRelation}
        >
          {relations.map((value, index) => {
            return <Picker.Item label={value} value={value} key={index} />;
          })}
        </Picker>
        <View style={bankform.padding}></View>
        <Text style={bankform.formtitle}>
          Employee Present Address Street *
        </Text>
        <TextInput style={bankform.formInput} />
        <StateDropdown
          stateTitle={"Employee Present address State"}
          districtTitle={"Employee Present address District"}
        />
        <Text style={bankform.formtitle}>Employee Present Pincode *</Text>
        <TextInput style={bankform.formInput} />
        <View style={bankform.padding}></View>
        <Text style={bankform.formtitle}>
          Employee Permanent Address Street *
        </Text>
        <TextInput style={bankform.formInput} />
        <StateDropdown
          stateTitle={"Employee Permanent address State"}
          districtTitle={"Employee Permanent address District"}
        />
        <Text style={bankform.formtitle}>Employee Permanent Pincode *</Text>
        <TextInput style={bankform.formInput} />
        <View style={bankform.padding}></View>
        <Text style={bankform.formtitle}>Nominee Address Street *</Text>
        <TextInput style={bankform.formInput} />
        <StateDropdown
          stateTitle={"Nominee address State"}
          districtTitle={"Nominee address District"}
        />
        <Text style={bankform.formtitle}>Nominee Pincode *</Text>
        <TextInput style={bankform.formInput} />
        <View style={bankform.padding}></View>

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
        <View style={bankform.padding}></View>
      </ScrollView>
    </SafeAreaView>
  );
};
