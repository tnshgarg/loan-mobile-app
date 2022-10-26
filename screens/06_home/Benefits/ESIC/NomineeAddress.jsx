import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import AddressDropdown from "../../../../components/AddressDropdown";
import { bankform, form, styles } from "../../../../styles";
import { useSelector } from "react-redux";
import { addressPush } from "../../../../helpers/BackendPush";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { COLORS } from "../../../../constants/Theme";
import PrimaryButton from "../../../../components/PrimaryButton";

export default NomineeAddress = () => {
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const address = useSelector((state) => state.esic.address);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <AddressDropdown type={"nominee"} />
          <PrimaryButton
            title="Finish"
            onPress={() => {
              {
                addressPush({ id: id, type: "nominee", address: address });
              }
              showToast("Nominee Address details recorded.");
              navigation.navigate("Home");
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};
