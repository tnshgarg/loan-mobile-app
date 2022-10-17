import { Button } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../../components/atoms/FormInput";
import DropDownForm from "../../../../components/molecules/DropDownForm";
import { showToast } from "../../../../components/Toast";
import { COLORS, FONTS } from "../../../../constants/Theme";
import { relationPush } from "../../../../helpers/BackendPush";
import {
  nomineeRelations,
  employeeRelations,
} from "../../../../helpers/RelationData";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { addESICFamilyDetails } from "../../../../store/slices/esicSlice";
import { bankform, form } from "../../../../styles";

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
        <FormInput
          placeholder={"Father's / Husband's Name*"}
          containerStyle={{ marginVertical: 10 }}
          value={fatherHusbandName}
          onChange={setRelationName}
        />

        <DropDownForm
          placeholder={"Relation with Employee (Father/Husband)*"}
          containerStyle={{ marginVertical: 10 }}
          value={fatherHusbandRelation}
          setValue={setRelation}
          data={employeeRelations}
        />
        <FormInput
          placeholder={"Name of Nominee (As per Aadhaar card)*"}
          containerStyle={{ marginVertical: 10 }}
          value={nomineeName}
          onChange={setNomineeName}
        />

        <DropDownForm
          placeholder={"Nominee Relationship with Employee*"}
          containerStyle={{ marginVertical: 10 }}
          value={nomineeRelation}
          setValue={setNomineeRelation}
          data={nomineeRelations}
        />

        <Button
          uppercase={false}
          title="Continue"
          type="solid"
          color={COLORS.primary}
          style={form.nextButton}
          titleStyle={{ ...FONTS.h3, color: COLORS.white }}
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
      </View>
    </KeyboardAvoidingWrapper>
  );
};
