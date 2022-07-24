import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import AddressDropdown from "../../../components/AddressDropdown";
import { bankform, form, styles } from "../../../styles";
import { useSelector } from "react-redux";
import { addressPush } from "../../../helpers/BackendPush";

export default EmployeeAddress = () => {
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const address = useSelector((state) => state.esic.address);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <AddressDropdown type={"present"} />
      <AddressDropdown type={"permanent"} />
      <Button
        uppercase={false}
        title="Continue"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          {addressPush({ id: id, type: "present", address: address})}
          {addressPush({ id: id, type: "permanent", address: address})}
          navigation.navigate("Benefits", {
            screen: "ESIC",
            params: {
              screen: "Nominee Address",
            },
          });
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};
