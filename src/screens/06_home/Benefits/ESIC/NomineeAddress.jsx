import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { showToast } from "../../../../components/atoms/Toast";
import AddressDropdown from "../../../../components/molecules/AddressDropdown";
import { addressPush } from "../../../../helpers/BackendPush";
import { navigate } from "../../../../navigators/RootNavigation";
import { styles } from "../../../../styles";

export default NomineeAddress = () => {
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const address = useSelector((state) => state.esic.address);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <AddressDropdown type={"nominee"} />
          <PrimaryButton
            title="Finish"
            onPress={() => {
              addressPush({
                data: {
                  unipeEmployeeId: unipeEmployeeId,
                  type: "nominee",
                  street: address["nominee"].street,
                  state: address["nominee"].state,
                  district: address["nominee"].district,
                  pin: address["nominee"].pincode,
                },
                token: token,
              });
              showToast("Nominee Address details recorded.", "success");
              navigate("HomeStack", { screen: "Home" });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};
