import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../../components/atoms/FormInput";
import DropDownForm from "../../../../components/molecules/DropDownForm";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { showToast } from "../../../../components/atoms/Toast";
import { relationPush } from "../../../../helpers/BackendPush";
import {
  nomineeRelations,
  employeeRelations,
} from "../../../../helpers/RelationData";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { addESICFamilyDetails } from "../../../../store/slices/esicSlice";
import { styles } from "../../../../styles";

export default Relation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

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
    <SafeAreaView style={styles.safeContainer}>
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

          <PrimaryButton
            title="Continue"
            onPress={() => {
              relationPush({
                data: {
                  unipeEmployeeId: unipeEmployeeId,
                  type: "fh",
                  relation: fatherHusbandRelation,
                  name: fatherHusbandName,
                },
                token: token,
              });

              relationPush({
                data: {
                  unipeEmployeeId: unipeEmployeeId,
                  type: "nominee",
                  relation: nomineeRelation,
                  name: nomineeName,
                },
                token: token,
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
    </SafeAreaView>
  );
};
