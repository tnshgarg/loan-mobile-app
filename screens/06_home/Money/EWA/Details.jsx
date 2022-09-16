import CheckBox from "@react-native-community/checkbox";
import { AppBar, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../../../components/PrimaryButton";
import { bankform, checkBox, styles } from "../../../../styles";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import {
  addName,
  addPanNumber,
  addMotherName,
  addDob,
  addAddress,
  addEmployer,
} from "../../../../store/slices/ewa/ewaDetailsSlice";

const Details = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(
    useSelector((state) => state.aadhaar.data?.name)
  );
  const [pan, setPan] = useState(useSelector((state) => state.pan.number));
  const [address, setAddress] = useState(
    useSelector((state) => state.aadhaar.data?.address)
  );
  const [dob, setDob] = useState(
    useSelector((state) => state.aadhaar.data?.date_of_birth)
  );
  const [motherName, setMotherName] = useState(
    useSelector((state) => state.ewaDetails.motherName)
  );
  const [employer, setEmployer] = useState(
    useSelector((state) => state.ewaDetails.employer)
  );
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    dispatch(addName(fullName));
    dispatch(addPanNumber(pan));
    dispatch(addDob(dob));
    dispatch(addAddress(address));
  }, []);

  useEffect(() => {
    dispatch(addMotherName(motherName));
  }, [motherName]);

  useEffect(() => {
    dispatch(addEmployer(employer));
  }, [employer]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Personal Details"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => {
              navigation.goBack();
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
            editable={false}
          />

          <Text style={bankform.formtitle}>PAN</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="characters"
            value={pan}
            onChangeText={setPan}
            editable={false}
          />

          <Text style={bankform.formtitle}>Mother's Name</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={motherName}
            onChangeText={setMotherName}
            editable={false}
          />

          <Text style={bankform.formtitle}>Date of Birth</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={dob}
            onChangeText={setDob}
            editable={false}
          />

          <Text style={bankform.formtitle}>Employer Name</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={employer}
            onChangeText={setEmployer}
            editable={false}
          />
          <Text style={bankform.formtitle}>Address</Text>
          <TextInput
            style={bankform.formInput}
            autoCapitalize="words"
            value={address}
            onChangeText={setAddress}
            multiline={true}
            editable={false}
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
              navigation.navigate("EWAMandate");
            }}
          />
          <View style={bankform.padding}></View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Details;
