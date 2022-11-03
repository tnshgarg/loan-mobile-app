import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, View } from "react-native";
import AddressDropdown from "../../../../components/AddressDropdown";
import { styles } from "../../../../styles";
import { useSelector } from "react-redux";
import { addressPush } from "../../../../helpers/BackendPush";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";

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
