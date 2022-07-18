import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { form, docSearch, bankform } from "../screens/styles";
import { Picker } from "@react-native-picker/picker";
const customData = require("../assets/state_districts.json");

export default StateDropdown = (props) => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  
  const states = Object.keys(customData);
  const [districts, setDistricts] = useState(["Please Choose a State"]);

  useEffect(() => {
    if (state) {
      setDistricts(customData[state]);
    }
  }, [state]);

  return (
    <>
      <Text style={bankform.formtitle}>{props.stateTitle}</Text>
      <Picker
        style={form.picker}
        prompt="Select State"
        selectedValue={state}
        onValueChange={setState}
      >
        {states.map((value, index) => {
          return <Picker.Item label={value} value={value} key={index} />;
        })}
      </Picker>
      <Text style={bankform.formtitle}>{props.districtTitle}</Text>
      <Picker
        style={form.picker}
        prompt="Select District"
        selectedValue={district}
        onValueChange={setDistrict}
      >
        {districts.map((value, index) => {
          return <Picker.Item label={value} value={value} key={index} />;
        })}
      </Picker>
    </>
  );
};
