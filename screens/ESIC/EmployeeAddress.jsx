import React, { useState, useEffect } from "react";
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

  const [presentPincode, setPresentPincode] = useState(
    useSelector((state) => state.esic.address.present.pincode)
  );

  const [permanentStreet, setPermanentStreet] = useState(
    useSelector((state) => state.esic.address.permanent.street)
  );

  const [permanentPincode, setPermanentPincode] = useState(
    useSelector((state) => state.esic.address.permanent.pincode)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type: "present", subtype: "street", val: presentStreet })
    );
  }, [presentStreet]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "present",
        subtype: "pincode",
        val: presentPincode,
      })
    );
  }, [presentPincode]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "permanent",
        subtype: "street",
        val: permanentStreet,
      })
    );
  }, [permanentStreet]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "permanent",
        subtype: "pincode",
        val: permanentPincode,
      })
    );
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
        type={"present"}
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
        type={"permanent"}
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
