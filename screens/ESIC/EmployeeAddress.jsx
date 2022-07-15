import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import StateDropdown from "../../components/StateDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../store/slices/esicSlice";

export default EmployeeAddress = () => {
  const dispatch = useDispatch();
  const [presentStreet, setPresentStreet] = useState(
    useSelector((state) => state.esic.address["presentStreet"])
  );
  const [presentState, setPresentState] = useState(
    useSelector((state) => state.esic.address["presentState"])
  );
  const [presentPincode, setPresentPincode] = useState(
    useSelector((state) => state.esic.address["presentPincode"])
  );

  const [permStreet, setPermStreet] = useState(
    useSelector((state) => state.esic.address["permStreet"])
  );
  const [permState, setPermState] = useState(
    useSelector((state) => state.esic.address["permState"])
  );
  const [permPincode, setPermPincode] = useState(
    useSelector((state) => state.esic.address["permPincode"])
  );

  const onFinish = () => {
    dispatch(
      addAddress({
        "presentStreet": presentStreet,
        "presentState": presentState,
        "presentPincode": presentPincode,
        "permStreet": permStreet,
        "permState": permState,
        "permPincode": permPincode,
      })
    );
  };
  
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
        value={permStreet}
        onChangeText={setPermStreet}
      />
      <StateDropdown
        stateTitle={"Employee Permanent address State"}
        districtTitle={"Employee Permanent address District"}
      />
      <Text style={bankform.formtitle}>Employee Permanent Pincode *</Text>
      <TextInput
        style={bankform.formInput}
        value={permPincode}
        onChangeText={setPermPincode}
      />
      <Button
        uppercase={false}
        title="Continue"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          onFinish();
          navigation.navigate("Home", {
            screen: "Documents",
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
