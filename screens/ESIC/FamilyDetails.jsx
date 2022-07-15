import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import relations from "../../helpers/RelationData";
import { useDispatch, useSelector } from "react-redux";
import { addFamilyDetails } from "../../store/slices/esicSlice";

export default FamilyDetails = () => {
  const dispatch = useDispatch();

  const fields = [
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
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [relation, setRelation] = useState("");
  const [relationName, setRelationName] = useState("");
  const [nomineeName, setNomineeName] = useState("");
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
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
      <Button
        uppercase={false}
        title="Continue"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          console.log("pressed");
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};
