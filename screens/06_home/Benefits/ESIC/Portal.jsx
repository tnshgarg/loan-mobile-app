import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { portalPush } from "../../../../helpers/BackendPush";
import { addESICPortal } from "../../../../store/slices/esicSlice";
import { bankform, styles } from "../../../../styles";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import FormInput from "../../../../components/atoms/FormInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";

export default Portal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  
  const [ipNumber, setIpNumber] = useState(
    useSelector((state) => state.esic.portal.ipNumber)
  );

  useEffect(() => {
    dispatch(addESICPortal({ type: "ipNumber", val: ipNumber }));
  }, [ipNumber]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <FormInput
            placeholder={"IP Number"}
            containerStyle={{ marginVertical: 10 }}
            value={ipNumber}
            onChange={setIpNumber}
          />
          <PrimaryButton
            title="Continue"
            onPress={() => {
              portalPush({ datat: {unipeEmployeeId: unipeEmployeeId, ipNumber: ipNumber}, token: token });
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
    </SafeAreaView>
  );
};
