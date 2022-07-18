import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import StateDropdown from "../../components/StateDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addESICAddress } from "../../store/slices/esicSlice";
import { useNavigation } from "@react-navigation/core";

export default NomineeAddress = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [nomineeStreet, setNomineeStreet] = useState(
    useSelector((state) => state.esic.address.nominee.street)
  );

  const [nomineePincode, setNomineePincode] = useState(
    useSelector((state) => state.esic.address.nominee.pincode)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type: "nominee", subtype: "street", val: nomineeStreet })
    );
  }, [nomineeStreet]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "nominee",
        subtype: "pincode",
        val: nomineePincode,
      })
    );
  }, [nomineePincode]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={bankform.formtitle}>Nominee Address Street *</Text>
      <TextInput
        style={bankform.formInput}
        value={nomineeStreet}
        onChangeText={setNomineeStreet}
      />
      <StateDropdown
        stateTitle={"Nominee address State"}
        districtTitle={"Nominee address District"}
      />
      <Text style={bankform.formtitle}>Nominee Pincode *</Text>
      <TextInput
        style={bankform.formInput}
        value={nomineePincode}
        onChangeText={setNomineePincode}
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
