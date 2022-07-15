import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import relations from "../../helpers/RelationData";
import { useDispatch, useSelector } from "react-redux";
import { addFamilyDetails } from "../../store/slices/esicSlice";
import { useNavigation } from "@react-navigation/core";
export default FamilyDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onFinish = () => {
    dispatch(
      addFamilyDetails({
        "relationName": relationName,
        "relation": relation,
        "nomineeName": nomineeName,
        "nomineeRelation": nomineeRelation,
      })
    );
  };
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
  const [nomineeRelation, setNomineeRelation] = useState(
    useSelector((state) => state.esic.familyDetails["nomineeRelation"])
  );
  const [relation, setRelation] = useState(
    useSelector((state) => state.esic.familyDetails["relation"])
  );
  const [relationName, setRelationName] = useState(
    useSelector((state) => state.esic.familyDetails["relationName"])
  );
  const [nomineeName, setNomineeName] = useState(
    useSelector((state) => state.esic.familyDetails["nomineeName"])
  );

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
          onFinish();
          navigation.navigate("Benefits", {
            screen: "ESIC",
            params: {
              screen: "Employee Address",
            },
          });
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};
