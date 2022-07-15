import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../styles";
import { Button } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { addEsic } from "../../store/slices/esicSlice";

export default ESIC = () => {
  const dispatch = useDispatch();
  const [esic, setEsic] = useState(
    useSelector((state) => state.esic.esic["esic"])
  );
  const [eeCode, setEECode] = useState(
    useSelector((state) => state.esic.esic["eecode"])
  );
  const onFinish = () => {
    dispatch(
      addEsic({
        "esic": esic,
        "eecode": eeCode,
      })
    );
  };
  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={bankform.formtitle}>Employer Establishment Code*</Text>
        <TextInput
          style={bankform.formInput}
          value={eeCode}
          onChangeText={setEECode}
        />
        <Text style={bankform.formtitle}>ESIC Number</Text>
        <TextInput
          style={bankform.formInput}
          value={esic}
          onChangeText={setEsic}
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
                screen: "Family Details",
              },
            });
          }}
        />
        <View style={bankform.padding}></View>
      </ScrollView>
    </>
  );
};
