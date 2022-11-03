import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, View } from "react-native";
import AddressDropdown from "../../../../components/AddressDropdown";
import { styles } from "../../../../styles";
import { useSelector } from "react-redux";
import { addressPush } from "../../../../helpers/BackendPush";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";

export default EmployeeAddress = () => {
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const address = useSelector((state) => state.esic.address);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <AddressDropdown type={"present"} />
          <AddressDropdown type={"permanent"} />
          <PrimaryButton
            title="Continue"
            onPress={() => {
              addressPush({
                data: {
                  unipeEmployeeId: unipeEmployeeId,
                  type: "present",
                  street: address["present"].street,
                  state: address["present"].state,
                  district: address["present"].district,
                  pin: address["present"].pincode,
                },
                token: token,
              });
              addressPush({
                data: {
                  unipeEmployeeId: unipeEmployeeId,
                  type: "permanent",
                  street: address["permanent"].street,
                  state: address["permanent"].state,
                  district: address["permanent"].district,
                  pin: address["permanent"].pincode,
                },
                token: token,
              });
              showToast("Employee Address details recorded.");
              navigation.navigate("Benefits", {
                screen: "ESIC",
                params: {
                  screen: "Nominee Address",
                },
              });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};
