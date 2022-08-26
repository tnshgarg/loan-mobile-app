import CheckBox from "@react-native-community/checkbox";
import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../components/PrimaryButton";
import { bankform, checkBox, styles } from "../../../styles";
import { KeyboardAvoidingWrapper } from "../../../KeyboardAvoidingWrapper";

const Details = () => {
  const navigation = useNavigation();
  const name =
    useSelector((state) => state.aadhaar.data["aadhaar_data"]?.["name"]) ||
    useSelector((state) => state.pan.data?.["name"]) ||
    "";
  const [fullName, setFullName] = useState(name);
  const [pan, setPan] = useState(
    useSelector((state) => state.pan.number) || ""
  );
  const [motherName, setMotherName] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [address, setAddress] = useState("");
  const [consent, setConsent] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Personal Details"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.goBack()
            }}
          />
        }
      />
      <KeyboardAvoidingWrapper>
        <View>
          <Text style={bankform.formtitle}>Full Name</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
            required
          />

          <Text style={bankform.formtitle}>PAN</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="characters"
            value={pan}
            onChangeText={setPan}
            required
          />

          <Text style={bankform.formtitle}>Mother's Name</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={motherName}
            onChangeText={setMotherName}
            required
          />

          <Text style={bankform.formtitle}>Employer Name</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={employerName}
            onChangeText={setEmployerName}
            required
          />
          <Text style={bankform.formtitle}>Address</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={address}
            onChangeText={setAddress}
            required
          />

          <View style={{ flexDirection: "row" }}>
            <CheckBox
              value={consent}
              onValueChange={setConsent}
              style={checkBox.checkBox}
              tintColors={{ true: "#4E46F1" }}
            />
            <Text style={checkBox.checkBoxText}>
              I agree to the Terms and Conditions.
            </Text>
          </View>
          <PrimaryButton
            title="My Details are Correct"
            uppercase={false}
            disabled={!consent}
            onPress={() => {
              navigation.navigate("EWAKYC");
            }}
          />
          <View style={bankform.padding}></View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Details;
