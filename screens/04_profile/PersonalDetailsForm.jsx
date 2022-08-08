import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import {
  addAlternatePhone,
  addEducationalQualification,
  addEmail,
  addMaritalStatus,
} from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, form, styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";

export default PersonalDetailsForm = () => {
  const educationalQualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ];
  const maritalStatuses = ["Unmarried", "Married"];
  const [maritalStatus, setMaritalStatus] = useState(
    useSelector((state) => state.profile["maritalStatus"])
  );
  const [educationalQualification, setEducationallQualification] = useState(
    useSelector((state) => state.profile["educationalQualification"])
  );
  const [alternatePhone, setAlternatePhone] = useState(
    useSelector((state) => state.profile["alternatePhone"])
  );
  const [email, setEmail] = useState(
    useSelector((state) => state.profile["email"])
  );
  const [next, setNext] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("PersonalDetailsForm"));
  }, []);
  useEffect(() => {
    dispatch(addMaritalStatus(maritalStatus));
  }, [maritalStatus]);
  useEffect(() => {
    dispatch(addEducationalQualification(educationalQualification));
  }, [educationalQualification]);
  useEffect(() => {
    dispatch(addAlternatePhone(alternatePhone));
  }, [alternatePhone]);
  useEffect(() => {
    dispatch(addEmail(email));
  }, [email]);

  useEffect(() => {
    if (maritalStatus && educationalQualification) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [maritalStatus, educationalQualification]);
  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.navigate("BankInfoForm")}
            />
          }
        />

        <ProgressBarTop step={4} />
        <Text style={form.formHeader}>Employee basic details</Text>
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Select Education*</Text>
            <Picker
              selectedValue={educationalQualification}
              style={form.picker}
              onValueChange={(itemValue) =>
                setEducationallQualification(itemValue)
              }
              prompt="Educational Qualification"
            >
              {educationalQualifications.map((item, index) => {
                return <Picker.Item label={item} value={item} />;
              })}
            </Picker>
            <Text style={form.formLabel}>Marital Status*</Text>
            <View style={styles.flexrow}>
              {maritalStatuses.map((item, index) => {
                return (
                  <Button
                    key={index}
                    uppercase={false}
                    style={
                      maritalStatus == item
                        ? form.chosenButton
                        : form.choiceButton
                    }
                    title={item}
                    type="solid"
                    color="#4E46F1"
                    onPress={() => setMaritalStatus(item)}
                  />
                );
              })}
            </View>
            <Text style={form.formLabel}>
              Enter your alternate mobile number
            </Text>
            <TextInput
              style={styles.textInput}
              value={alternatePhone}
              onChangeText={setAlternatePhone}
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              required
              placeholder="XXXXXXXXXX"
            />
            <Text style={form.formLabel}>Enter your Email ID</Text>
            <TextInput
              style={form.formTextInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              required
            />

          {next ? (
            <Button
              title="Continue"
              type="solid"
              uppercase={false}
              style={form.nextButton}
              color="#4E46F1"
              onPress={() => {
                navigation.navigate("PersonalImage");
              }}
            />
          ) : (
            <Button
              title="Continue"
              uppercase={false}
              type="solid"
              style={form.nextButton}
              disabled
            />
          )}
          <View style={bankform.padding}></View>
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};
