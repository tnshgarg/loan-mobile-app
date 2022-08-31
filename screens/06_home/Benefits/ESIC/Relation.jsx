import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
<<<<<<<< HEAD:screens/06_home/Benefits/ESIC/FamilyDetails.jsx
import relations from "../../../../helpers/RelationData";
import { addESICFamilyDetails } from "../../../../store/slices/esicSlice";
import { familyDetailsPush } from "../../../../helpers/BackendPush";
import { bankform, form, styles } from "../../../../styles";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
========
import relations from "../../../helpers/RelationData";
import { addESICFamilyDetails } from "../../../store/slices/esicSlice";
import { relationPush } from "../../../helpers/BackendPush";
import { bankform, form } from "../../../styles";
import { showToast } from "../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../KeyboardAvoidingWrapper";
>>>>>>>> develop:screens/06_home/Benefits/ESIC/Relation.jsx

export default Relation = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const id = useSelector((state) => state.auth.id);
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
    <KeyboardAvoidingWrapper>
      <View>
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
            relationPush({
              id: id,
              type: "fh",
              relation: fatherHusbandRelation,
              name: fatherHusbandName,
            });

            relationPush({
              id: id,
              type: "nominee",
              relation: nomineeRelation,
              name: nomineeName,
            });

            showToast("Family details recorded.");
            navigation.navigate("Benefits", {
              screen: "ESIC",
              params: {
                screen: "Employee Address",
              },
            });
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};
