import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import AddressDropdown from "../../../components/AddressDropdown";
import { bankform, form } from "../../../styles";
import { useSelector } from "react-redux";
import { addressPush } from "../../../helpers/BackendPush";
import { showToast } from "../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../KeyboardAvoidingWrapper";

export default EmployeeAddress = () => {

  const navigation = useNavigation();
  
  const id = useSelector((state) => state.auth.id);
  const address = useSelector((state) => state.esic.address);

  return (
    <KeyboardAvoidingWrapper>
      <View>
        <AddressDropdown type={"present"} />
        <AddressDropdown type={"permanent"} />
        <Button
          uppercase={false}
          title="Continue"
          type="solid"
          color="#4E46F1"
          style={form.nextButton}
          onPress={() => {
              addressPush({
                id: id, 
                type: "present", 
                street: address["present"].street,
                state: address["present"].state,
                district: address["present"].district,
                pin: address["present"].pincode, 
              });
              addressPush({
                id: id, 
                type: "permanent", 
                street: address["permanent"].street,
                state: address["permanent"].state,
                district: address["permanent"].district,
                pin: address["permanent"].pincode, 
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
        <View style={bankform.padding}></View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};
