import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import StateDropdown from "../../components/StateDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../store/slices/esicSlice";

export default EmployeeAddress = () => {
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={bankform.formtitle}>Employee Present Address Street *</Text>
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
