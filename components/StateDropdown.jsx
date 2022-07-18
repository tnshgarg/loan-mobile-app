import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { form, docSearch, bankform } from "../screens/styles";
import { Picker } from "@react-native-picker/picker";
const customData = require("../assets/state_districts.json");
import { useDispatch, useSelector } from "react-redux";
import { addESICAddress } from "../store/slices/esicSlice";

export default StateDropdown = (props) => {
  const [districts, setDistricts] = useState(["Please Choose a State"]);

  const dispatch = useDispatch();
  const states = Object.keys(customData);
  const [presentState, setPresentState] = useState(
    useSelector((state) => state.esic.address.present.state)
  );
  const [presentDistrict, setPresentDistrict] = useState(
    useSelector((state) => state.esic.address.present.district)
  );
  const [permanentState, setPermanentState] = useState(
    useSelector((state) => state.esic.address.permanent.state)
  );
  const [permanentDistrict, setPermanentDistrict] = useState(
    useSelector((state) => state.esic.address.permanent.district)
  );

  const [nomineeState, setNomineeState] = useState(
    useSelector((state) => state.esic.address.nominee.state)
  );
  const [nomineeDistrict, setNomineeDistrict] = useState(
    useSelector((state) => state.esic.address.nominee.district)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type: "nominee", subtype: "state", val: nomineeState })
    );
  }, [nomineeState]);
  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "nominee",
        subtype: "district",
        val: nomineeDistrict,
      })
    );
  }, [nomineeDistrict]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "permanent",
        subtype: "state",
        val: permanentState,
      })
    );
  }, [permanentState]);
  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "permanent",
        subtype: "district",
        val: permanentDistrict,
      })
    );
  }, [permanentDistrict]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type: "present", subtype: "state", val: presentState })
    );
  }, [presentState]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "present",
        subtype: "district",
        val: presentDistrict,
      })
    );
  }, [presentDistrict]);

  // switch to dispatch the right state and district as per props.type
  switch (props.type) {
    case "present":
      pickerSettings = {
        stateValue: presentState,
        districtValue: presentDistrict,
        setStateValue: setPresentState,
        setDistrictValue: setPresentDistrict,
      };
      break;
    case "permanent":
      pickerSettings = {
        stateValue: permanentState,
        districtValue: permanentDistrict,
        setStateValue: setPermanentState,
        setDistrictValue: setPermanentDistrict,
      };
      break;
    default:
      pickerSettings = {
        stateValue: nomineeState,
        districtValue: nomineeDistrict,
        setStateValue: setNomineeState,
        setDistrictValue: setNomineeDistrict,
      };
      break;
  }
  useEffect(() => {
    if (pickerSettings["stateValue"]) {
      setDistricts(customData[pickerSettings["stateValue"]]);
      console.log(pickerSettings["stateValue"]);
    }
  }, [pickerSettings]);

  return (
    <>
      <Text style={bankform.formtitle}>{props.stateTitle}</Text>
      <Picker
        style={form.picker}
        prompt="Select State"
        selectedValue={pickerSettings.stateValue}
        onValueChange={pickerSettings.setStateValue}
      >
        {states.map((value, index) => {
          return <Picker.Item label={value} value={value} key={index} />;
        })}
      </Picker>
      <Text style={bankform.formtitle}>{props.districtTitle}</Text>
      <Picker
        style={form.picker}
        prompt="Select District"
        selectedValue={pickerSettings.districtValue}
        onValueChange={pickerSettings.setDistrictValue}
      >
        {districts.map((value, index) => {
          return <Picker.Item label={value} value={value} key={index} />;
        })}
      </Picker>
    </>
  );
};
