import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import AddressDropdown from "../../../components/AddressDropdown";
import { bankform, form, styles } from "../../../styles";

export default EmployeeAddress = () => {
  const navigation = useNavigation();

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
