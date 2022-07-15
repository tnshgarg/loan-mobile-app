import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import StateDropdown from "../../components/StateDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addNomineeAddress } from "../../store/slices/esicSlice";

export default NomineeAddress = () => {
  const dispatch = useDispatch();
  const [nomStreet, setNomStreet] = useState(useSelector((state) => state.esic.nomineeAddress["nomStreet"]));
  const [nomState, setNomState] = useState(useSelector((state) => state.esic.nomineeAddress["nomState"]));
  const [nomPincode, setNomPincode] = useState(useSelector((state) => state.esic.nomineeAddress["nomPincode"]));

  const onFinish = () => {
    dispatch(
      addNomineeAddress({"nomStreet":nomStreet,"nomState":nomState,"nomPincode":nomPincode})
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={bankform.formtitle}>Nominee Address Street *</Text>
      <TextInput
        style={bankform.formInput}
        value={nomStreet}
        onChangeText={setNomStreet}
      />
      <StateDropdown
        stateTitle={"Nominee address State"}
        districtTitle={"Nominee address District"}
      />
      <Text style={bankform.formtitle}>Nominee Pincode *</Text>
      <TextInput
        style={bankform.formInput}
        value={nomPincode}
        onChangeText={setNomPincode}
      />
      <Button
        uppercase={false}
        title="Finish"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          onFinish();
          console.log("pressed");
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};
