import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import relations from "../../helpers/RelationData";
import { useDispatch, useSelector } from "react-redux";
import { addESICFamilyDetails } from "../../store/slices/esicSlice";
import { useNavigation } from "@react-navigation/core";

export default FamilyDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fatherHusbandRelation, setRelation] = useState(
    useSelector((state) => state.esic.familyDetails.fatherHusband.relation)
  );
  const [fatherHusbandName, setRelationName] = useState(
    useSelector((state) => state.esic.familyDetails.fatherHusband.name)
  );
  const [nomineeRelation, setNomineeRelation] = useState(
    useSelector((state) => state.esic.familyDetails.nominee.relation)
  );
  const [nomineeName, setNomineeName] = useState(
    useSelector((state) => state.esic.familyDetails.nominee.name)
  );

  useEffect(() => {
    dispatch(
      addESICFamilyDetails({
        type: "fatherHusband",
        subtype: "relation",
        val: fatherHusbandRelation,
      })
    );
  }, [fatherHusbandRelation]);

  useEffect(() => {
    dispatch(
      addESICFamilyDetails({
        type: "fatherHusband",
        subtype: "name",
        val: fatherHusbandName,
      })
    );
  }, [fatherHusbandName]);

  useEffect(() => {
    dispatch(
      addESICFamilyDetails({
        type: "nominee",
        subtype: "relation",
        val: nomineeRelation,
      })
    );
  }, [nomineeRelation]);

  useEffect(() => {
    dispatch(
      addESICFamilyDetails({
        type: "nominee",
        subtype: "name",
        val: nomineeName,
      })
    );
  }, [nomineeName]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={bankform.formtitle}>Father's / Husband's Name *</Text>
      <TextInput
        style={bankform.formInput}
        value={fatherHusbandName}
        onChangeText={setRelationName}
      />

      <Text style={bankform.formtitle}>
        Relation with Employee (Father/Husband) *
      </Text>
      <Picker
        style={form.picker}
        prompt="Relation with Employee (Father/Husband) *"
        selectedValue={fatherHusbandRelation}
        onValueChange={setRelation}
      >
        <Picker.Item label="Father" value="Father" />
        <Picker.Item label="Husband" value="Husband" />
      </Picker>

      <Text style={bankform.formtitle}>
        Name of Nominee (As per Aadhaar card) *
      </Text>
      <TextInput
        style={bankform.formInput}
        value={nomineeName}
        onChangeText={setNomineeName}
      />

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
