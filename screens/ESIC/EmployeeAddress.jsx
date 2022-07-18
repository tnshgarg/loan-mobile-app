import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import StateDropdown from "../../components/StateDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addESICAddress } from "../../store/slices/esicSlice";
import { useNavigation } from "@react-navigation/core";

export default EmployeeAddress = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [presentStreet, setPresentStreet] = useState(
    useSelector((state) => state.esic.address.present.street)
  );
  // TODO: set State and District from StateDropDown component
  const [presentState, setPresentState] = useState(
    useSelector((state) => state.esic.address.present.state)
  );
  const [presentDistrict, setPresentDistrict] = useState(
    useSelector((state) => state.esic.address.present.district)
  );
  const [presentPincode, setPresentPincode] = useState(
    useSelector((state) => state.esic.address.present.pincode)
  );

  const [permanentStreet, setPermanentStreet] = useState(
    useSelector((state) => state.esic.address.permanent.street)
  );
  const [permanentState, setPermanentState] = useState(
    useSelector((state) => state.esic.address.permanent.state)
  );
  const [permanentDistrict, setPermanentDistrict] = useState(
    useSelector((state) => state.esic.address.permanent.district)
  );
  const [permanentPincode, setPermanentPincode] = useState(
    useSelector((state) => state.esic.address.permanent.pincode)
  );

  useEffect(() => {
    dispatch(addESICAddress({type: "present", subtype: "street", val: presentStreet}));
  }, [presentStreet]);
  useEffect(() => {
    dispatch(addESICAddress({type: "present", subtype: "state", val: presentState}));
  }, [presentState]);
  useEffect(() => {
    dispatch(addESICAddress({type: "present", subtype: "district", val: presentDistrict}));
  }, [presentDistrict]);
  useEffect(() => {
    dispatch(addESICAddress({type: "present", subtype: "pincode", val: presentPincode}));
  }, [presentPincode]);

  useEffect(() => {
    dispatch(addESICAddress({type: "permanent", subtype: "street", val: permanentStreet}));
  }, [permanentStreet]);
  useEffect(() => {
    dispatch(addESICAddress({type: "permanent", subtype: "state", val: permanentState}));
  }, [permanentState]);
  useEffect(() => {
    dispatch(addESICAddress({type: "permanent", subtype: "district", val: permanentDistrict}));
  }, [permanentDistrict]);
  useEffect(() => {
    dispatch(addESICAddress({type: "permanent", subtype: "pincode", val: permanentPincode}));
  }, [permanentPincode]);
  
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={bankform.formtitle}>Employee Present Address Street *</Text>
      <TextInput
        style={bankform.formInput}
        value={presentStreet}
        onChangeText={setPresentStreet}
      />
      <StateDropdown
        stateTitle={"Employee Present address State"}
        districtTitle={"Employee Present address District"}
      />
      <Text style={bankform.formtitle}>Employee Present Pincode *</Text>
      <TextInput
        style={bankform.formInput}
        value={presentPincode}
        onChangeText={setPresentPincode}
      />
      <View style={bankform.padding}></View>
      <Text style={bankform.formtitle}>
        Employee Permanent Address Street *
      </Text>
      <TextInput
        style={bankform.formInput}
        value={permanentStreet}
        onChangeText={setPermanentStreet}
      />
      <StateDropdown
        stateTitle={"Employee Permanent address State"}
        districtTitle={"Employee Permanent address District"}
      />
      <Text style={bankform.formtitle}>Employee Permanent Pincode *</Text>
      <TextInput
        style={bankform.formInput}
        value={permanentPincode}
        onChangeText={setPermanentPincode}
      />
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
              screen: "Nominee Address",
            },
          });
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};
