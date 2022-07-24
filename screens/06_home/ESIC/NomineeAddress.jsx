import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import AddressDropdown from "../../../components/AddressDropdown";
import { bankform, form, styles } from "../../../styles";

export default NomineeAddress = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <AddressDropdown type={"nominee"} />
      <Button
        uppercase={false}
        title="Finish"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          {addressPush({ id: id, type: "nominee", address: address})}
          navigation.navigate("Home");
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};
