import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import FormInput from "../../../../components/atoms/FormInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { showToast } from "../../../../components/atoms/Toast";
import { portalPush } from "../../../../helpers/BackendPush";
import { navigate } from "../../../../navigators/RootNavigation";
import { addESICPortal } from "../../../../store/slices/esicSlice";
import { bankform, styles } from "../../../../styles";

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
            value={ipNumber}
            onChange={setIpNumber}
          />
          <PrimaryButton
            title="Continue"
            onPress={() => {
              portalPush({
                data: { unipeEmployeeId: unipeEmployeeId, ipNumber: ipNumber },
                token: token,
              });
              showToast("ESIC Portal details recorded.", "success");
              navigate("Benefits", {
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
