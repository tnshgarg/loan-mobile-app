import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { portalPush } from "../../../../helpers/BackendPush";
import { addESICPortal } from "../../../../store/slices/esicSlice";
import { bankform, form, styles } from "../../../../styles";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";

export default Portal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const [estCode, setEstCode] = useState(
    useSelector((state) => state.esic.portal.estCode)
  );
  const [ipNumber, setIpNumber] = useState(
    useSelector((state) => state.esic.portal.ipNumber)
  );

  useEffect(() => {
    dispatch(addESICPortal({ type: "estCode", val: estCode }));
  }, [estCode]);

  useEffect(() => {
    dispatch(addESICPortal({ type: "ipNumber", val: ipNumber }));
  }, [ipNumber]);

  return (
      <KeyboardAvoidingWrapper>
        <View>
          {/* <Text style={bankform.formtitle}>Employer Establishment Code*</Text>
        <TextInput
          style={bankform.formInput}
          value={estCode}
          onChangeText={setEstCode}
        /> */}
          <Text style={bankform.formtitle}>IP Number</Text>
          <TextInput
            style={bankform.formInput}
            value={ipNumber}
            onChangeText={setIpNumber}
          />
          <Button
            uppercase={false}
            title="Continue"
            type="solid"
            color="#4E46F1"
            style={form.nextButton}
            onPress={() => {
              portalPush({ id: id, ipNumber: ipNumber });
              showToast("ESIC Portal details recorded.");
              navigation.navigate("Benefits", {
                screen: "ESIC",
                params: {
                  screen: "Family Details",
                },
              });
            }}
          />
          <View style={bankform.padding}></View>
        </View>
      </KeyboardAvoidingWrapper>
  );
};
